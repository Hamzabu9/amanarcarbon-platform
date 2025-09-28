import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// WHAT: Root layout component for the AmanarCarbon platform
// WHY: Provides consistent layout, fonts, and metadata across all pages
// FUTURE: Will include authentication providers and global state management

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'AmanarCarbon - Carbon Management Platform',
    template: '%s | AmanarCarbon'
  },
  description: 'Comprehensive carbon tracking and management platform for individuals, businesses, NGOs, and governments. Track emissions, offset carbon, and manage your carbon footprint with verified carbon credits.',
  keywords: ['carbon credits', 'emissions tracking', 'carbon marketplace', 'climate action', 'carbon offset', 'sustainability', 'ESG', 'carbon footprint'],
  authors: [{ name: 'AmanarCarbon Team' }],
  creator: 'AmanarCarbon',
  publisher: 'AmanarCarbon',
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
    locale: 'en_US',
    url: 'https://amanarcarbon.com',
    siteName: 'AmanarCarbon',
    title: 'AmanarCarbon - Carbon Management Platform',
    description: 'Comprehensive carbon tracking and management platform for individuals, businesses, NGOs, and governments',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AmanarCarbon - Carbon Management Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AmanarCarbon - Carbon Management Platform',
    description: 'Comprehensive carbon tracking and management platform for individuals, businesses, NGOs, and governments',
    images: ['/twitter-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        {children}
      </body>
    </html>
  );
}
