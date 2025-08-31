'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState(''); // combined status (e.g., "email is required name is required")
  const [emailErr, setEmailErr] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateEmailSimple = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim());

  const sendOtp = async () => {
    // Clear previous errors/status
    setStatus('');
    setEmailErr('');
    setNameErr('');

    // Collect missing/invalid messages in exact lowercase format requested
    const missing: string[] = [];

    if (!email.trim()) {
      missing.push('email is required');

    } else if (!validateEmailSimple(email)) {
      // If you want an invalid format message, add it (keeps lowercase style)
      missing.push('Email is required'); // keep the same message as requested, or change to 'enter valid email'
 
    }

    if (!name.trim()) {
      missing.push('Name is required');
      
    }

    if (missing.length) {
      // Show the combined message exactly as you asked (space-separated)
      setStatus(missing.join(' '));
      return; // stop, don't call backend
    }

    // All good -> call backend
    setLoading(true);
    try {
      const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000';
      const url = base.replace(/\/$/, '').endsWith('/api')
        ? `${base.replace(/\/$/, '')}/auth/send-otp-signup`
        : `${base.replace(/\/$/, '')}/api/auth/send-otp-signup`;

      const res = await axios.post(url, { email: email.trim(), name: name.trim() }, { validateStatus: () => true });
      if (res.status === 200) {
        router.push(`/signup/verify?email=${encodeURIComponent(email.trim())}`);
      } else {
        setStatus(res.data?.message || `Failed (${res.status})`);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setStatus(err.response?.data?.message ?? 'Something went wrong');
      } else {
        setStatus('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-wrap">
      <div className="container-card">
        <div className="logo-wrapper mx-auto md:mx-0">
          <Image src="/assets/logo.png" alt="logo" width={54} height={54} className="object-contain" />
          <span className="text-xl font-bold text-blue-600">NoteForge</span>
        </div>

        <div className="text-2xl h-page-title"><h2>Sign up</h2></div>
        <p className="p-subtitle mt-1">Sign up to enjoy the features of NoteForge</p>

        <div className="form-stack mt-6">
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (nameErr) setNameErr('');
              if (status) setStatus('');
            }}
            placeholder="Your name"
            aria-label="Your name"
            type="text"
            className="mb-1"
          />
          {nameErr && <p className="text-red-600 text-sm mb-2">{nameErr}</p>}

          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailErr) setEmailErr('');
              if (status) setStatus('');
            }}
            placeholder="Email"
            aria-label="Email"
            type="email"
            className="mb-1"
          />
          {emailErr && <p className="text-red-600 text-sm mb-2">{emailErr}</p>}

          <button
            type="button"
            onClick={sendOtp}
            className="btn-primary"
            disabled={loading}
            aria-disabled={loading}
          >
            {loading ? 'Sending…' : 'Get OTP'}
          </button>

          <p className="helper-row">
            Already have an account?{' '}
            <Link href="/signin" className="text-primary underline">Sign in</Link>
          </p>

          {/* Combined status message (exact format requested) */}
          {status && <p className="form-status text-red-600 mt-2">{status}</p>}

          <div className="form-divider" aria-hidden>
            <hr />
            <span>OR</span>
            <hr />
          </div>

          <a href={process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL || '/api/auth/google'} rel="noopener noreferrer" className="btn-outline">
            <span className="icon-circle" aria-hidden>
              <Image src="/assets/Google_logo.png" alt="Google" width={18} height={18} />
            </span>
            <span className="leading-none">Continue with Google</span>
          </a>
        </div>
      </div>
    </main>
  );
}
