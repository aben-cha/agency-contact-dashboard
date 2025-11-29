'use client';

import { useState } from 'react';
import { Mail, Phone, Briefcase, Building2, Eye } from 'lucide-react';

interface ContactCardProps {
  contact: {
    id: string;
    firstName: string;
    lastName: string;
    email: string | null;
    phone: string | null;
    title: string | null;
    department: string | null;
    agency: {
      name: string;
      state: string | null;
    } | null;
  };
  userId: string;
  isBlurred: boolean;
  index: number;
}

export function ContactCard({ contact, userId, isBlurred, index }: ContactCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleReveal = async () => {
    if (isBlurred || isRevealed) return;

    setIsRecording(true);
    try {
      // Record the view
      await fetch('/api/contacts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactId: contact.id }),
      });
      setIsRevealed(true);
    } catch (error) {
      console.error('Failed to record view:', error);
    } finally {
      setIsRecording(false);
    }
  };

  const shouldBlur = isBlurred && !isRevealed;

  return (
    <div
      className={`bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-purple-500 transition-all duration-200 ${
        shouldBlur ? 'relative overflow-hidden' : ''
      }`}
    >
      {/* Blur Overlay */}
      {shouldBlur && (
        <div className="absolute inset-0 bg-slate-800/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="text-center">
            <Eye className="w-12 h-12 text-slate-500 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">Limit reached</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={shouldBlur ? 'blur-sm' : ''}>
        {/* Name and Title */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-white">
            {contact.firstName} {contact.lastName}
          </h3>
          {contact.title && (
            <div className="flex items-center gap-2 text-slate-400 mt-1">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm">{contact.title}</span>
            </div>
          )}
        </div>

        {/* Agency */}
        {contact.agency && (
          <div className="flex items-center gap-2 text-slate-400 mb-3">
            <Building2 className="w-4 h-4" />
            <span className="text-sm">
              {contact.agency.name}
              {contact.agency.state && ` • ${contact.agency.state}`}
            </span>
          </div>
        )}

        {/* Contact Info */}
        <div className="space-y-2">
          {contact.email && (
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-4 h-4 text-purple-400" />
              <a
                href={`mailto:${contact.email}`}
                className="text-sm hover:text-purple-400 transition-colors"
              >
                {contact.email}
              </a>
            </div>
          )}
          {contact.phone && (
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="w-4 h-4 text-purple-400" />
              <a
                href={`tel:${contact.phone}`}
                className="text-sm hover:text-purple-400 transition-colors"
              >
                {contact.phone}
              </a>
            </div>
          )}
        </div>

        {/* Department */}
        {contact.department && (
          <div className="mt-3 pt-3 border-t border-slate-700">
            <span className="text-xs text-slate-500">Department: </span>
            <span className="text-sm text-slate-400">{contact.department}</span>
          </div>
        )}
      </div>

      {/* View Button (for non-blurred, non-revealed contacts) */}
      {!isBlurred && !isRevealed && (
        <button
          onClick={handleReveal}
          disabled={isRecording}
          className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Eye className="w-4 h-4" />
          {isRecording ? 'Recording...' : 'View Contact'}
        </button>
      )}

      {isRevealed && !isBlurred && (
        <div className="mt-4 text-center text-xs text-green-400">
          ✓ Viewed
        </div>
      )}
    </div>
  );
}