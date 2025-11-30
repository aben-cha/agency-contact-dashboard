# agency-contact-dashboard
A Next.js dashboard for managing agency contacts with authentication and daily viewing limits. Built with Clerk, Prisma, and PostgreSQL (Supabase).

## 🚀 Tech Stack
    Framework        Next.js 16 (App Router)
    Language         TypeScript
    Styling          Tailwind CSS
    Authentication   Clerk
    Database         PostgreSQL (Supabase)
    ORM              Prisma
    Deployment       Vercel
    UI Components    Custom + shadcn/ui


## 📌 Features
-  User authentication (Sign in / Sign up)
-  Protected dashboard routes
-  View and browse agencies
-  View contact information with pagination
-  Daily viewing limit (50 contacts per day per user)
-  Upgrade prompt when limit is exceeded
-  Responsive design

## 🏗️ Project Structure: 
    agency-contact-dashboard/
    ├── data/
    │   ├── contacts_contact_rows.csv    # Contact data
    │   └── agencies_agency.csv           # Agency data
    ├── scripts/
    │   └── import_data.ts                # Data import script
    ├── prisma/
    │   └── schema.prisma                 # Database schema
    ├── src/
    │   ├── app/
    │   │   ├── (protected)/              # Protected route group
    │   │   │   ├── layout.tsx            # Shared layout for protected routes
    │   │   │   ├── dashboard/
    │   │   │   │   └── page.tsx          # Dashboard home
    │   │   │   ├── contacts/
    │   │   │   │   └── page.tsx          # Contacts table
    │   │   │   └── agencies/
    │   │   │       └── page.tsx          # Agencies table
    │   │   ├── api/
    │   │   │   ├── contacts/
    │   │   │   │   └── route.ts          # Contacts API endpoint
    │   │   │   └── agencies/
    │   │   │       └── route.ts          # Agencies API endpoint
    │   │   ├── sign-in/[[...sign-in]]/
    │   │   │   └── page.tsx              # Clerk sign-in page
    │   │   ├── sign-up/[[...sign-up]]/
    │   │   │   └── page.tsx              # Clerk sign-up page
    │   │   ├── layout.tsx                # Root layout
    │   │   ├── page.tsx                  # Landing page
    │   │   └── globals.css               # Global styles
    │   ├── components/
    │   │   ├── Dashboard.tsx             # Dashboard component
    │   │   ├── DashboardHeader.tsx       # Header component
    │   │   ├── Navbar.tsx                # Navigation component
    │   │   ├── UserMenu.tsx              # User menu component
    │   │   ├── contacts/                 # Contact-related components
    │   │   ├── agencies/                 # Agency-related components
    │   │   └── ui/                       # Reusable UI components
    │   │       ├── button.tsx
    │   │       ├── checkbox.tsx
    │   │       ├── input.tsx
    │   │       └── table.tsx
    │   ├── lib/
    │   │   ├── queries/
    │   │   │   └── dashboard.ts          # Database queries
    │   │   ├── clerk-theme.ts            # Clerk theming
    │   │   ├── prisma.ts                 # Prisma client
    │   │   └── utils.ts                  # Utility functions
    │   └── types/
    │       └── index.ts                  # TypeScript types
    ├── .env.local                        # Environment variables
    ├── package.json
    ├── tsconfig.json
    └── tailwind.config.ts

## 🛠️ Installation & Setup
    Prerequisites: 
        * Node.js 18+
        * Supabase account (free tier available)
        * Clerk account (free tier available)

1. Clone the Repository
    * git clone https://github.com/aben-cha/agency-contact-dashboard.git
    * cd agency-contact-dashboard

2. Install Dependencies: 
    npm install

3. Environment Variables
Create a .env file in the root directory:
Getting Your Supabase Connection String:

    * Go to your Supabase Dashboard
    * Select your project
    * Go to Settings → Database
    * Copy the connection string under "Connection string" → "URI"
    * Replace [YOUR-PASSWORD] with your database password

    # Database
    DATABASE_URL="postgresql://username:password@localhost:6543/postgres?pgbouncer=true"
    DATABASE_URL="postgresql://username:password@localhost:5432/postgres"

    

    # Clerk Authentication
        * NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
        * CLERK_SECRET_KEY=your_clerk_secret_key

    # Clerk Routes
        * NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
        * NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
        * NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
        * NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
    Add :  
        
        generator client {
            provider = "prisma-client-js"
        }

        datasource db {
            provider  = "postgresql"
            url       = env("DATABASE_URL")
            directUrl = env("DIRECT_URL")
        }
To prisma/schema.prisma

4. Database Setup
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Import CSV data
    Add this script to your package.json:

    "scripts": {
        "import": "tsx scripts/import-data.ts"
    }

    Then run:
        npm run import

5. Run Development Server : npm run dev

## 📊 Database Schema
![Database Diagram](database.png)

## 🔒 Authentication & Authorization

* Clerk Integration - Handles user authentication
* Protected Routes - Middleware ensures only authenticated users access protected pages
* API Route Protection - All API endpoints verify authentication
* Session Management - Automatic session handling via Clerk

## 🎯 Key Features Implementation
Daily Viewing Limit

    Each user can view up to 50 contacts per day
    Limit resets at midnight (UTC)
    Tracked via Contact_views table in database
    Exceeding limit shows upgrade prompt

Pagination

    Contacts, Agencies displayed in paginated tables
    Configurable page size
    Server-side pagination for performance

Responsive Design

    Mobile-first approach
    Breakpoints: mobile (< 640px), tablet (640-1024px), desktop (> 1024px)
    Touch-friendly interface


## 🌐 Live Demo

    The dashboard is live and accessible online:

    https://agency-contact-dashboard.vercel.app/

    You can sign up, log in, and explore the features directly without setting up the project locally.