import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'NoteForge',
  description: 'Simple & secured notes taking app'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-slate-50">
          <div className="max-w-xl mx-auto p-4">{children}</div>
        </div>
      </body>
    </html>
  );
}
