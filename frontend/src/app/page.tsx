'use client';

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import developerAnimation from '../../public/assets/developer-animation.json';
import Link from 'next/link';
import Image from 'next/image';
export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Logo */}
      <header className="w-full bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-20 py-3">
          <div className="flex items-center gap-2 text-base font-bold text-blue-600">
            <Image
              src="/assets/logo.png"
              alt="NoteForge"
              width={54}
              height={34}
  
            />
            <span className="text-sm">NoteForge</span>
          </div>
        </div>
      </header>

      {/* Hero Section  */}
      <main className="flex-1 text-center max-w-3xl mx-auto mt-16 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs sm:text-sm md:text-base font-medium text-gray-800 mb-2"
        >
          Welcome to <span className="text-blue-600">NoteForge,</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-gray-600 text-sm"
        >
          <p className="mb-3">
            A clean, minimal yet secured note taking app. Manage your notes effortlessly and stay organized across all devices.
          </p>

          <ul className="list-disc text-gray-500 text-left max-w-md mx-auto pl-5 space-y-1 text-sm mb-3">
            <li>Sign up at ease</li>
            <li>Take notes</li>
            <li>Enjoy !</li>
          </ul>

          <div className="mt-1 flex justify-center">
            <Link
              href="/signin"
              className="text-blue-600 text-sm font-medium inline-flex items-center gap-1 transform transition-transform duration-150 hover:translate-x-1"
            >
              Continue →
            </Link>
          </div>
        </motion.div>

        {/* Lottie SVG */}
        <div className="mt-1 flex justify-center pb-12">
          <Lottie animationData={developerAnimation} loop autoplay style={{ width: 260, height: 260 }} />
        </div>
      </main>
    </div>
  );
}
