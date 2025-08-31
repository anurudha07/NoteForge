'use client';
import React, { useState } from 'react';

type Props = {
  onCreate: (title: string, content?: string) => Promise<void>;
};

export default function NoteForm({ onCreate }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const submit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErr('');
    if (!title.trim()) {
      setErr('Title is required');
      return;
    }
    setLoading(true);
    try {
      await onCreate(title.trim(), content.trim() || undefined);
      setTitle('');
      setContent('');
    } catch {
      setErr('Failed to create note');
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={submit}
      className="noteform-root w-full max-w-sm mx-auto"
      
      style={{ paddingTop: 6, paddingBottom: 6 }}
    >
      {/* Title field wrapper */}
      <div className="field" style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-primary"
          
          style={{ minHeight: 'auto', paddingTop: 12, paddingBottom: 12, boxSizing: 'border-box' }}
        />
      </div>

      {/* Content field wrapper */}
      <div className="field" style={{ marginBottom: 22 }}>
        <textarea
          rows={5}
          placeholder="Content (optional)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          style={{ minHeight: 'auto', paddingTop: 12, paddingBottom: 12, boxSizing: 'border-box' }}
        />
      </div>

      {/* Button wrapper  */}
      <div className="submit-wrap" style={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full max-w-[220px] rounded-full px-6 py-3 bg-primary text-white hover:bg-primary/90"
          style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Creating...' : 'Create Note'}
        </button>
      </div>

      {err && (
        <p className="text-red-600 text-sm text-center" style={{ marginTop: 12 }}>
          {err}
        </p>
      )}
    </form>
  );
}
