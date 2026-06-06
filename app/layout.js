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
  metadataBase: new URL('https://easyvector.ai'),
  title: {
    default: 'EasyVector.ai — Convert AI Logos & Bitmaps to Vectors Instantly',
    template: '%s — EasyVector.ai',
  },
  description: 'Purpose-built for sign makers, print shops, CNC operators and exhibition builders. Convert AI-generated logos and bitmap images to clean SVG, EPS, DXF and PDF vectors in seconds. No redrawing required.',
  keywords: [
    'bitmap to vector',
    'image to vector converter',
    'PNG to SVG',
    'JPG to SVG',
    'AI logo to vector',
    'vectorize image',
    'sign maker software',
    'DXF converter',
    'EPS converter',
    'vector conversion tool',
    'print shop tools',
    'CNC vector files',
    'vinyl cutter files',
    'CorelDRAW compatible',
    'Illustrator vector',
  ],
  authors: [{ name: 'Signsaver Ltd', url: 'https://easyvector.ai' }],
  creator: 'Signsaver Ltd',
  publisher: 'Signsaver Ltd',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://easyvector.ai',
    siteName: 'EasyVector.ai',
    title: 'EasyVector.ai — Convert AI Logos & Bitmaps to Vectors Instantly',
    description: 'Purpose-built for sign makers, print shops, CNC operators and exhibition builders. Convert AI-generated logos and bitmap images to clean SVG, EPS, DXF and PDF vectors in seconds.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EasyVector.ai — Bitmap to Vector Converter for Sign Makers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EasyVector.ai — Convert AI Logos & Bitmaps to Vectors Instantly',
    description: 'Purpose-built for sign makers, print shops, CNC operators and exhibition builders. Convert AI-generated logos and bitmap images to clean vectors in seconds.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://easyvector.ai',
  },
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
