import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://claimanchor.net')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Claim Anchor — Free Accident Case Review',
  description:
    'Were you injured in an accident? Find out in 60 seconds if you qualify for compensation. Free case review, no obligation.',
  keywords: 'personal injury, accident claim, free case review, car accident lawyer',
  openGraph: {
    title: 'Claim Anchor — Were You Injured in an Accident?',
    description: 'Find out in 60 seconds if you qualify for compensation. Free, no obligation.',
    type: 'website',
    url: siteUrl,
    siteName: 'Claim Anchor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claim Anchor — Free Accident Case Review',
    description: 'Find out in 60 seconds if you qualify for compensation. Free, no obligation.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const trustedFormScript = process.env.TRUSTEDFORM_SCRIPT

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {trustedFormScript && (
          <script
            type="text/javascript"
            src={trustedFormScript}
            async
          />
        )}
        {/* TrustedForm default script if not overridden */}
        {!trustedFormScript && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function() {
                var field = 'xxTrustedFormCertUrl';
                var provideXxx = false;
                var tf = document.createElement('script');
                tf.type = 'text/javascript'; tf.async = true;
                tf.src = 'http' + ('https:' == document.location.protocol ? 's' : '') +
                  '://api.trustedform.com/trustedform.js?provide_referrer=false&field=' + field + '&l=' +
                  new Date().getTime() + Math.random();
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(tf, s);
              })();`,
            }}
          />
        )}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`,
              }}
            />
          </>
        )}
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
