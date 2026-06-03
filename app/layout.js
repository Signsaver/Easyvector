import { ClerkProvider } from '@clerk/nextjs';
import { Bebas_Neue, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const dmMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-mono',
});

export const metadata = {
  title: 'EasyVector.ai — Bitmap to Vector in Seconds',
  description: 'Purpose-built for sign makers, print shops, graphic designers and exhibition builders. Upload PNG or JPEG files and download ready to use vectors instantly.',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable} ${dmMono.variable}`}>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
