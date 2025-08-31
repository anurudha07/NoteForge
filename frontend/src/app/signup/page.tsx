'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const sendOtp = async () => {
    setStatus('');
    if (!email.trim()) return setStatus('Email is required');
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/auth/send-otp`, { email, name });
      router.push(`/signup/verify?email=${encodeURIComponent(email)}`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setStatus(err.response?.data?.message ?? 'Failed to send OTP');
      } else {
        setStatus('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  const googleUrl = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL || '/api/auth/google';

  return (
    <main className="page-wrap">
      <div className="container-card">
        {/* Logo */}
        <div className="logo-wrapper mx-auto md:mx-0">
          <Image
            src="/assets/logo.png"
            alt="logo"
            width={54}
            height={54}
            className="object-contain"
          />
          <span className="text-xl font-bold text-blue-600">NoteForge</span>
        </div>

        {/* Title & subtitle */}
        <div className="text-2xl h-page-title"><h2 >Sign up</h2></div>
        <p className="p-subtitle mt-1">Sign up to enjoy the features of NoteForge</p>

        {/* Form */}
        <div className="form-stack mt-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            aria-label="Your name (optional)"
            type="text"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            aria-label="Email"
            type="email"
          />
          <button
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

          {status && <p className="form-status">{status}</p>}

          {/* Divider */}
          <div className="form-divider" aria-hidden>
            <hr />
            <span>OR</span>
            <hr />
          </div>

          {/* Google Button */}
          <a
            href={googleUrl}
            rel="noopener noreferrer"
            className="
              btn-outline
              shadow-[0_8px_30px_rgba(37,99,235,0.08)]
              hover:shadow-[0_12px_40px_rgba(37,99,235,0.12)]
              transition-all duration-200
            "
            aria-label="Continue with Google"
          >
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
