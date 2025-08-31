'use client';
import React from 'react';

type Note = {
  _id: string;
  title: string;
  content?: string;
};

export default function NoteCard({
  note,
  onDelete,
}: {
  note: Note;
  onDelete: (id: string) => void;
}) {
  return (
    <article
      className="note-card-custom"
      role="article"
      aria-labelledby={`note-title-${note._id}`}
    >
      <div className="flex-1">
        <h4 id={`note-title-${note._id}`} className="text-lg font-semibold text-gray-900 leading-tight truncate">
          {note.title}
        </h4>

        {note.content && (
          <p className="mt-2 text-gray-600 text-sm line-clamp-4 break-words">
            {note.content}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onDelete(note._id)}
        aria-label="Delete note"
        title="Delete note"
        className="note-delete-btn"
      >
        {/* Trash icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 6h18" />
          <path d="M8 6v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
      </button>
    </article>
  );
}
