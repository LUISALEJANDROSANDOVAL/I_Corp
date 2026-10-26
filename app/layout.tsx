import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cinzel, Cormorant_Garamond, Montserrat } from 'next/font/google'
import './globals.css'
import { ChapterIndicator } from '@/components/miel/chapter-indicator'
import { CustomCursor } from '@/components/miel/custom-cursor'
import { ScrollProgress } from '@/components/miel/scroll-progress'
import { SmoothScroll } from '@/components/miel/smooth-scroll'
import { Soundscape } from '@/components/miel/soundscape'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mielbosquedelchaco.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Miel Natural del Bosque Chaqueño — Origen Intacto',
  description:
    'Miel cruda de monte chaqueño cosechada a mano en Cuevo, Provincia Cordillera, Santa Cruz, Bolivia. Extracción artesanal en frío de quebracho, mistol, algarrobo y abejas meliponas.',
  keywords: [
    'miel natural bolivia',
    'miel de cuevo',
    'miel del chaco',
    'miel cruda silvestre',
    'melipona bolivia',
    'miel santa cruz cordillera',
    'miel artesanal en frio',
  ],
  authors: [{ name: 'Miel Natural del Bosque Chaqueño' }],
  creator: 'Miel Natural del Bosque Chaqueño',
  publisher: 'Miel Natural del Bosque Chaqueño',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_BO',
    url: siteUrl,
    siteName: 'Miel Natural del Bosque Chaqueño',
    title: 'Miel Natural del Bosque Chaqueño — Origen Intacto, Bosque Puro Chaco',
    description:
      'Presentación de marca: miel cruda silvestre cosechada en frío desde el bosque seco de Cuevo, Bolivia.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Miel Natural del Bosque Chaqueño — Origen Intacto',
    description:
      'Presentación de marca: miel cruda silvestre cosechada en frío desde el bosque seco de Cuevo, Bolivia.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#111111',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const brandJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Brand',
    name: 'Miel Natural del Bosque Chaqueño',
    alternateName: 'Miel del Bosque Chaqueño',
    url: siteUrl,
    logo: `${siteUrl}/images/logo-oficial-white.png`,
    description:
      'Producción y extracción artesanal en frío de miel cruda silvestre de floraciones nativas de Cuevo, Gran Chaco boliviano.',
    originAddress: {
      '@type': 'PostalAddress',
      addressLocality: 'Cuevo',
      addressRegion: 'Provincia Cordillera, Santa Cruz',
      addressCountry: 'BO',
    },
    slogan: 'Origen Intacto, Bosque Puro Chaco',
  }

  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${montserrat.variable} ${cinzel.variable} bg-forest-dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(brandJsonLd) }}
        />
      </head>
      <body
        className="font-sans antialiased text-cream bg-forest-dark selection:bg-amber selection:text-forest-dark"
        suppressHydrationWarning
      >
        <SmoothScroll />
        <CustomCursor />
        <div className="film-grain" aria-hidden="true" />
        <ScrollProgress />
        <ChapterIndicator />
        <Soundscape />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
