import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.brightbots.io";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "BrightBots — AI Automation Agency for SMEs",
    template: "%s | BrightBots",
  },
  description:
    "BrightBots builds custom AI agents and workflow automations for small businesses. Cut repetitive work, reduce costs, and scale faster — live in weeks, not months.",
  keywords: [
    "AI automation agency",
    "AI agents for small business",
    "workflow automation",
    "business automation Monaco",
    "AI automation SME",
    "BrightBots",
    "how long does AI deployment take",
    "autonomous AI platforms",
  ],
  authors: [{ name: "Alexandre Saussier", url: BASE_URL }],
  creator: "BrightBots",
  publisher: "BrightBots",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "BrightBots",
    title: "BrightBots — AI Automation Agency for SMEs",
    description: "BrightBots builds custom AI agents and workflow automations for small businesses. Live in weeks, not months.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BrightBots - AI Automation Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BrightBots — AI Automation Agency for SMEs",
    description:
      "BrightBots builds custom AI agents and workflow automations for small businesses. Live in weeks, not months.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  other: {
    "geo.region": "MC",
    "geo.placename": "Monaco",
    "geo.position": "43.738418;7.401688",
    ICBM: "43.738418, 7.401688",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "BrightBots",
  description:
    "AI automation agency based in Monaco specialising in custom AI agents and workflow automation for businesses.",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/og-image.png`,
  telephone: "",
  email: "alex@brightbots.io",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Monaco",
    addressCountry: "MC",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.738418,
    longitude: 7.401688,
  },
  areaServed: [
    { "@type": "Country", name: "Monaco" },
    { "@type": "City", name: "Nice" },
    { "@type": "City", name: "Cannes" },
    { "@type": "City", name: "Antibes" },
  ],
  serviceType: "AI Automation",
  priceRange: "$$",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="ed2acdee-412d-4f84-bead-1cf49d6ba786"
        />
      </head>
      <body className={`${inter.variable} ${roboto.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
