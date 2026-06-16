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
  description: 'Free AI image to vector converter for sign makers and print shops. Convert logos to clean SVG, EPS, DXF and PDF vectors in seconds — no credit card.',
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
    description: 'Free AI image to vector converter for sign makers and print shops. Convert logos and bitmaps to clean SVG, EPS, DXF and PDF vectors in seconds — no credit card required.',
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
    description: 'Free AI image to vector converter for sign makers and print shops. Convert logos and bitmaps to clean SVG, EPS, DXF and PDF vectors in seconds — no credit card required.',
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

const clerkAppearance = {
  variables: {
    colorBackground: '#1a1d1f',
    colorInputBackground: '#0f1011',
    colorInputText: '#f0ede8',
    colorText: '#f0ede8',
    colorTextSecondary: '#a09d98',
    colorPrimary: '##de4426',
    colorDanger: '#f87171',
    colorSuccess: '#4ade80',
    borderRadius: '8px',
  },
  elements: {
    card: {
      background: '#1a1d1f',
      border: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
    },
    headerTitle: { color: '#f0ede8' },
    headerSubtitle: { color: '#a09d98' },
    socialButtonsBlockButton: {
      background: '#0f1011',
      border: '1px solid rgba(255,255,255,0.12)',
      color: '#f0ede8',
    },
    socialButtonsBlockButtonText: { color: '#f0ede8' },
    dividerLine: { background: 'rgba(255,255,255,0.1)' },
    dividerText: { color: '#a09d98' },
    formFieldLabel: { color: '#a09d98' },
    formFieldInput: {
      background: '#0f1011',
      border: '1px solid rgba(255,255,255,0.15)',
      color: '#f0ede8',
    },
    formFieldInputShowPasswordButton: { color: '#a09d98' },
    formButtonPrimary: {
      background: '#de4426',
      color: '#000',
      fontWeight: '600',
    },
    footerActionLink: { color: '#de4426' },
    footerActionText: { color: '#a09d98' },
    identityPreviewText: { color: '#f0ede8' },
    identityPreviewEditButton: { color: '#de4426' },
    // Profile/account modal
    profileSectionTitle: { color: '#f0ede8' },
    profileSectionTitleText: { color: '#f0ede8' },
    profileSectionContent: { color: '#f0ede8' },
    profileSectionPrimaryButton: {
      color: '#de4426',
      borderColor: '#de4426',
    },
    accordionTriggerButton: { color: '#f0ede8' },
    navbarButton: { color: '#a09d98' },
    navbarButtonActive: { color: '#f0ede8' },
    pageScrollBox: { background: '#1a1d1f' },
    page: { background: '#1a1d1f' },
    userPreviewMainIdentifier: { color: '#f0ede8' },
    userPreviewSecondaryIdentifier: { color: '#a09d98' },
    badge: { background: 'rgba(245,130,10,0.15)', color: '#de4426' },
    menuList: {
      background: '#1a1d1f',
      border: '1px solid rgba(255,255,255,0.1)',
    },
    menuItem: { color: '#f0ede8' },
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={clerkAppearance}>
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
