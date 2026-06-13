import { ClerkProvider } from '@clerk/nextjs';
import { Bebas_Neue, DM_Sans, DM_Mono } from 'next/font/google';
import Script from 'next/script';
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
    default: 'EasyVector.ai — AI Logos & Bitmaps to Vectors Instantly',
    template: '%s — EasyVector.ai',
  },
  description: 'Convert AI logos and bitmaps to clean SVG, EPS, DXF and PDF vectors in seconds. Built for sign makers, print shops and CNC professionals.',
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
  verification: {
    google: '6b4Bn5NhKkmPdSF6eybD5UWh9Bo5XuOo64PBqqvzOeY',
    other: {
      'msvalidate.01': 'E8D78F1F4D4D3D6812CAE3CC3DBE3551',
    },
  },
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
    title: 'EasyVector.ai — AI Logos & Bitmaps to Vectors Instantly',
    description: 'Convert AI logos and bitmaps to clean SVG, EPS, DXF and PDF vectors in seconds. Built for sign makers, print shops and CNC professionals.',
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
    title: 'EasyVector.ai — AI Logos & Bitmaps to Vectors Instantly',
    description: 'Convert AI logos and bitmaps to clean SVG, EPS, DXF and PDF vectors in seconds. Built for sign makers, print shops and CNC professionals.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://easyvector.ai',
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'EasyVector.ai',
  legalName: 'Signsaver Ltd',
  url: 'https://easyvector.ai',
  logo: 'https://easyvector.ai/logo.svg',
  description: 'EasyVector.ai converts AI-generated logos and bitmap images into clean, production-ready vector files for sign makers, print shops and CNC professionals.',
  sameAs: [
    'https://www.linkedin.com/in/easy-vector-946a4b414/',
    'https://www.facebook.com/easyvectorai/',
    'https://www.instagram.com/vectoreasily/',
    'https://www.youtube.com/@easyvectorai',
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'EasyVector.ai',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Web',
  url: 'https://easyvector.ai',
  description: 'Convert AI logos and bitmaps to clean SVG, EPS, DXF and PDF vectors in seconds. Built for sign makers, print shops and CNC professionals.',
  offers: [
    {
      '@type': 'Offer',
      name: 'Free',
      price: '0',
      priceCurrency: 'GBP',
      description: '1 free trace on registration, SVG & PNG output',
    },
    {
      '@type': 'Offer',
      name: 'Hobby',
      price: '19',
      priceCurrency: 'GBP',
      description: '50 traces per month, SVG, EPS & PDF output. Billed monthly.',
    },
    {
      '@type': 'Offer',
      name: 'Pro',
      price: '39',
      priceCurrency: 'GBP',
      description: '150 traces per month, all 6 output formats, colour separation, batch upload. Billed monthly.',
    },
    {
      '@type': 'Offer',
      name: 'Studio',
      price: '79',
      priceCurrency: 'GBP',
      description: '350 traces per month, all 6 output formats, API access, priority support. Billed monthly.',
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable} ${dmMono.variable}`}>
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
          />
        </head>
        <body>
          {/* Google tag — GA4 + Google Ads */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-BPVNMP5RKM"
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BPVNMP5RKM');
              gtag('config', 'AW-861109733');
            `}
          </Script>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
