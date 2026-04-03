import type { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';

import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500'],
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'CaloriePal — Track what fuels you',
  description: 'Nutrition tracking built for people who actually care about what they eat.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="bg-[#0d0d0d] text-[#e8e4dc] antialiased">{children}</body>
    </html>
  );
}