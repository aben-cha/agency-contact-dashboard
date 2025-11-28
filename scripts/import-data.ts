import 'dotenv/config'
import prisma from '../src/app/lib/prisma'
import fs from 'fs'
import csv from 'csv-parser'
import path from 'path'

import { AgencyRow, ContactRow } from '@/src/app/types'

function normalizeRow<T extends Record<string, any>>(row: T): T {
  const out: Record<string, any> = {}
  for (const key of Object.keys(row)) {
    const v = row[key]
    out[key] = typeof v === 'string' ? v.trim() : v
  }
  return out as T
}

function toIntOrNull(v?: string) {
  if (!v) return null
  const n = parseInt(v.replace(/,/g, ''), 10)
  return Number.isNaN(n) ? null : n
}
function toBigIntOrNull(v?: string) {
  if (!v) return null
  try {
    const cleaned = v.replace(/,/g, '').trim()
    return cleaned === '' ? null : BigInt(cleaned)
  } catch {
    return null
  }
}

async function readCsv<T>(filename: string): Promise<T[]> {
  const records: T[] = []
  const filePath = path.join(process.cwd(), 'data', filename)
  if (!fs.existsSync(filePath)) throw new Error(`CSV file not found: ${filePath}`)
  return new Promise<T[]>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row: any) => {
        records.push(normalizeRow(row))
      })
      .on('end', () => resolve(records))
      .on('error', (err) => reject(err))
  })
}

async function importAgencies() {
  console.log('Reading agencies CSV...')
  const rows = await readCsv<AgencyRow>('agencies_agency_rows.csv')
  console.log(`Found ${rows.length} agency rows`)

  const batchSize = 500
  const batches: any[][] = []
  for (let i = 0; i < rows.length; i += batchSize) {
    batches.push(rows.slice(i, i + batchSize))
  }

  let totalInserted = 0
  for (const batch of batches) {
    const data = batch.map(r => {
      return {
        id: r.id || undefined,
        name: r.name || null,
        state: r.state || null,
        stateCode: r.state_code || null,
        type: r.type || null,
        population: toBigIntOrNull(r.population),
        website: r.website || null,
        totalSchools: toIntOrNull(r.total_schools),
        totalStudents: toIntOrNull(r.total_students),
        mailingAddress: r.mailing_address || null,
        gradeSpan: r.grade_span || null,
        locale: r.locale || null,
        csaCbsa: r.csa_cbsa || null,
        domainName: r.domain_name || null,
        physicalAddress: r.physical_address || null,
        phone: r.phone || null,
        status: r.status || null,
        studentTeacherRatio: r.student_teacher_ratio || null,
        supervisoryUnion: r.supervisory_union || null,
        county: r.county || null,
        createdAt: r.created_at ? new Date(r.created_at) : undefined,
        updatedAt: r.updated_at ? new Date(r.updated_at) : undefined,
      }
    })

    try {
      await prisma.agency.createMany({ data, skipDuplicates: true })
      totalInserted += data.length
      console.log(`Batch inserted (or skipped duplicates): ${data.length}`)
    } catch (err: any) {
      console.warn('createMany failed for agencies batch, falling back to per-row upsert:', err.message)
      for (const r of data) {
        try {
          const cleaned: any = {}
          for (const k in r) if (r[k] !== undefined) cleaned[k] = r[k]
          await prisma.agency.upsert({
            where: { id: cleaned.id },
            create: cleaned,
            update: {},
          })
        } catch (e: any) {
          console.error('Failed upserting agency', r.id, e.message)
        }
      }
    }
  }

  console.log(`Agencies import attempted for ${rows.length} rows (createMany/upsert).`)
  return
}

async function importContacts() {
  console.log('Reading contacts CSV...')
  const rows = await readCsv<ContactRow>('contacts_contact_rows.csv')
  console.log(`Found ${rows.length} contact rows`)

  console.log('Fetching existing agencies from DB...')
  const agencies = await prisma.agency.findMany({ select: { id: true } })
  const validAgencyIds = new Set(agencies.map(a => a.id))
  console.log(`Found ${validAgencyIds.size} agency IDs in DB`)

  const invalidExamples: string[] = []
  const validContacts: ContactRow[] = []
  for (const r of rows) {
    const aid = (r.agency_id || '').trim()
    if (!aid || !validAgencyIds.has(aid)) {
      if (invalidExamples.length < 5) {
        invalidExamples.push(`${aid} -> ${r.first_name} ${r.last_name}`)
      }
      continue
    }
    validContacts.push(r)
  }

  if (invalidExamples.length > 0) {
    console.log('Examples of contacts with missing/invalid agency_id:')
    invalidExamples.forEach(x => console.log('  ', x))
    console.log(`Skipping ${rows.length - validContacts.length} contacts due to missing agency references\n`)
  }

  if (validContacts.length === 0) {
    console.log('No valid contacts to import. Exiting contacts import.')
    return
  }

  console.log(`Importing ${validContacts.length} contacts in batches...`)
  const batchSize = 500
  for (let i = 0; i < validContacts.length; i += batchSize) {
    const batch = validContacts.slice(i, i + batchSize)
    const data = batch.map(c => {
      return {
        id: c.id || undefined,
        firstName: c.first_name || null,
        lastName: c.last_name || null,
        email: c.email || null,
        phone: c.phone || null,
        title: c.title || null,
        emailType: c.email_type || null,
        contactFormUrl: c.contact_form_url || null,
        department: c.department || null,
        agencyId: c.agency_id || undefined,
        firmId: c.firm_id || null,
        createdAt: c.created_at ? new Date(c.created_at) : undefined,
        updatedAt: c.updated_at ? new Date(c.updated_at) : undefined,
      }
    })

    const cleaned = data.map(d => {
      const out: any = {}
      for (const k in d) if (d[k] !== undefined) out[k] = d[k]
      return out
    })

    try {
      await prisma.contact.createMany({ data: cleaned, skipDuplicates: true })
      console.log(`Imported batch ${i / batchSize + 1} (${cleaned.length} rows)`)
    } catch (err: any) {
      console.warn('createMany failed for contacts batch, falling back to per-row create:', err.message)
      for (const row of cleaned) {
        try {
          await prisma.contact.create({ data: row })
        } catch (e: any) {
          console.error('Failed inserting contact', row.id, e.message)
        }
      }
    }
  }

  console.log('Contacts import complete.')
}

async function main() {
  console.log('Starting data import...\n')
  try {
    await importAgencies()
    await importContacts()
    console.log('\nData import completed successfully!')
  } catch (err) {
    console.error('Fatal error during import:', err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()