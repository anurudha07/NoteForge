'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';
import Header from '../../components/Header';
import NoteForm from '../../components/NoteForm';
import NoteCard from '../../components/NoteCard';
import { createPortal } from 'react-dom';

type Note = { _id: string; title: string; content?: string };
type JwtPayload = { id?: string; name?: string; email?: string;[k: string]: unknown } | null;

function decodeJwt(token?: string): JwtPayload {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = parts[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
    return JSON.parse(atob(padded)) as JwtPayload;
  } catch {
    return null;
  }
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    setMounted(true);

    let root = document.getElementById('modal-root') as HTMLElement | null;
    if (!root) {
      root = document.createElement('div');
      root.id = 'modal-root';
      root.style.position = 'relative';
      root.style.zIndex = '2147483646';
      document.body.appendChild(root);
    }
    setPortalRoot(root);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setClosing(true);
        setTimeout(onClose, 160);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!mounted || !portalRoot) return null;

  const backdropStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0,0,0,0.46)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    zIndex: 2147483647,
    transition: 'opacity 160ms ease',
    opacity: closing ? 0 : 1,

  };

  const panelStyle: React.CSSProperties = {
    width: '100%',

    maxWidth: '380px',
    margin: '0 16px',
    background: '#fff',
    borderRadius: '14px',
    boxShadow: '0 20px 40px rgba(2,6,23,0.12)',

    transform: closing ? 'scale(0.98)' : 'scale(1)',
    transition: 'transform 160ms ease, opacity 160ms ease',
    opacity: closing ? 0 : 1,
    position: 'relative',
    marginBottom: 80,
    overflow: 'auto',
    maxHeight: '100vh',
    padding: '32px 24px',


  };

  const closeBtnStyle: React.CSSProperties = {
    position: 'absolute',
    right: 12,
    top: 12,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: 18,
    color: '#444',
  };

  return createPortal(
    <div style={backdropStyle} onClick={() => { setClosing(true); setTimeout(onClose, 160); }} role="dialog" aria-modal="true">
      <div style={panelStyle} onClick={(e) => e.stopPropagation()}>
        <button aria-label="Close" style={closeBtnStyle} onClick={() => { setClosing(true); setTimeout(onClose, 160); }}>✕</button>
        {children}
      </div>
    </div>,
    portalRoot
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');

    if (urlToken) {
      Cookies.set('token', urlToken);
      localStorage.setItem('token', urlToken);
      router.replace('/dashboard');
      setToken(urlToken);
      return;
    }

    const savedToken = Cookies.get('token') || localStorage.getItem('token');
    if (!savedToken) {
      router.replace('/signin');
      setToken(null);
      return;
    }

    setToken(savedToken);
  }, [router]);

  useEffect(() => {
    if (!token) return;

    const decoded = decodeJwt(token);
    setUser({ name: decoded?.name as string | undefined, email: decoded?.email as string | undefined });

    const load = async () => {
      setErr('');
      setLoading(true);
      try {
        const api = axios.create({
          baseURL: process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000',
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        const res = await api.get<Note[]>('/notes');
        setNotes(res.data || []);
      } catch (error: unknown) {
        if (error instanceof AxiosError) setErr(error.response?.data?.message || 'Failed to load notes');
        else setErr('Failed to load notes');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);


  const getApi = () =>
    axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });



  const createNote = async (title: string, content?: string) => {
    setErr('');
    try {
      const res = await getApi().post<Note>('/notes', { title, content });
      setNotes((prev) => [res.data, ...prev]);
      setShowCreate(false);
    } catch (error: unknown) {
      if (error instanceof AxiosError) setErr(error.response?.data?.message || 'Failed to create note');
      else setErr('Failed to create note');
      throw error;
    }
  };

  const deleteNote = async (id: string) => {
    setErr('');
    try {
      await getApi().delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (error: unknown) {
      if (error instanceof AxiosError) setErr(error.response?.data?.message || 'Failed to delete');
      else setErr('Failed to delete');
    }
  };

  if (token === undefined) {
    return (
      <main className="min-h-screen px-6 py-8 bg-gray-50 flex justify-center items-center">
        <p className="text-gray-600">Checking …</p>
      </main>
    );
  }

  return (
    <main className="px-6 py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Header title="Dashboard" />

        {/* Welcome */}
        <div className="dashboard-card mt-6 p-6 rounded-xl shadow bg-white">
          <h2 className="text-xl font-bold">
            Welcome, <span className="text-primary">{user?.name || 'User'}</span>!
          </h2>
          <p className="text-gray-600 mt-2">
            Email: <span className="font-medium">{user?.email || 'xxxxxx@xxxx.com'}</span>
          </p>
        </div>

        {/* Create Note Button */}

        <div className="mt-6">
          <div className="flex justify-center md:justify-end">
            {/* Wrapper: full width on mobile, auto width on md+ so button can shrink */}
            <div className="w-full md:w-auto">
              <button
                type="button"
                onClick={() => setShowCreate(true)}
                className="btn-primary w-full md:w-40 lg:w-48 md:h-10 md:rounded-md text-sm"
              >
                + Create New Note
              </button>
            </div>
          </div>
        </div>


        {/* Modal */}
        {showCreate && (
          <Modal onClose={() => setShowCreate(false)}>
            <h2 className="text-sm mb-4 text-center ">Create New Note</h2>
            <NoteForm onCreate={createNote} />
          </Modal>
        )}


        {/* Notes List  */}
        <section className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Notes</h3>


          {loading && <p className="text-gray-500 mb-4">Loading...</p>}

          {/* empty state */}
          {!loading && notes.length === 0 && (
            <p className="text-gray-500 text-sm mb-4">No notes yet. Create one above!</p>
          )}

          {/* notes grid */}
          <div className="notes-grid" role="list">
            {notes.map((n) => (
              <NoteCard key={n._id} note={n} onDelete={deleteNote} />
            ))}
          </div>
        </section>
        {err && <p className="text-red-600 mt-6 text-center">{err}</p>}
      </div>
    </main>
  );
}
