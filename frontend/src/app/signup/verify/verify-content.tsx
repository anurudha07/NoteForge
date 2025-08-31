'use client';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function VerifyPage() {
  const sp = useSearchParams();
  const email = sp.get('email') || '';
  const [otp, setOtp] = useState('');
  const [err, setErr] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const showTempMessage = (setter: (val: string) => void, message: string) => {
    setter(message);
    setTimeout(() => setter(''), 3000);
  };

  const verify = async () => {
    setErr('');
    if (!otp.trim()) return showTempMessage(setErr, 'Enter OTP');
    try {
      const res = await axios.post<{ token: string }>(
        `${process.env.NEXT_PUBLIC_API_BASE}/auth/verify-otp`,
        { email, otp }
      );
      Cookies.set('token', res.data.token, { expires: 7 });
      router.push('/dashboard');
    } catch (error: unknown) {
      const axiosErr = error as AxiosError<{ message?: string }>;
      showTempMessage(setErr, axiosErr.response?.data?.message || 'Verification failed');
    }
  };

  const resendOtp = async () => {
    setErr('');
    setStatus('');
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/auth/resend-otp`, { email });
      showTempMessage(setStatus, 'OTP has been resent to your email.');
    } catch (error: unknown) {
      const axiosErr = error as AxiosError<{ message?: string }>;
      showTempMessage(setErr, axiosErr.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-wrap">
      <div className="container-card max-w-md mx-auto">
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

        {/* Heading */}
        <div className="text-2xl h-page-title">
          <h2>Verify OTP</h2>
        </div>
        <p className="p-subtitle mt-1 text-center md:text-left">
          We’ve sent a One Time Password to <span className="font-semibold">{email}</span>
        </p>

        {/* Form */}
        <div className="form-stack mt-6">
          <input
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
              if (err) setErr('');
            }}
            placeholder="Enter 6-digit OTP"
            className="w-full rounded-lg border border-gray-300 bg-white py-3 px-4 text-base placeholder-gray-400 focus:ring-2 focus:ring-primary outline-none"
          />

          {/* Resend OTP */}
          <p className="text-sm text-center md:text-left">
            Didn&apos;t receive OTP?{' '}
            <span
              onClick={resendOtp}
              className={`cursor-pointer underline text-primary hover:text-primary-dark ${
                loading ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              {loading ? 'Resending...' : 'Resend OTP'}
            </span>
          </p>

          <button
            onClick={verify}
            className="btn-primary w-full"
            disabled={loading}
          >
            Verify & Continue
          </button>

          {/* Status Messages */}
          {err && <p className="text-red-600 text-sm mt-2 text-center">{err}</p>}
          {status && <p className="text-green-600 text-sm mt-2 text-center">{status}</p>}
        </div>
      </div>
    </main>
  );
}
