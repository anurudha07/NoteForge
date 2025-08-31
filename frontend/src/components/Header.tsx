'use client';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Image from 'next/image';
export default function Header({ title = 'NoteForge' }: { title?: string }) {
  const signOut = () => {
    Cookies.remove('token');
    window.location.href = process.env.NEXT_PUBLIC_FRONTEND_URL || '/';
  };

  return (
    <header className="w-full flex items-center justify-between px-4 md:px-6 py-4 bg-white shadow-sm">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Image src="/assets/logo.png" alt="logo"  width={54} height={34} />
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      </div>

      {/* Sign Out*/}
      <Link
        href="#"
        onClick={signOut}
        className="text-blue-500 hover:text-blue-600 underline text-sm font-medium cursor-pointer transition-colors duration-200"
      >
        Sign Out
      </Link>
    </header>
  );
}
