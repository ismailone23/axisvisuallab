import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteDescription, siteUrl } from "./site";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Axis Visual Lab | Websites, Apps, Video & Graphic Design",
  description: siteDescription,
  keywords: [
    "Axis Visual Lab",
    "website development",
    "web design",
    "app development",
    "custom tech solutions",
    "video editing",
    "graphic design",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Axis Visual Lab | Creative & Tech Studio",
    description: siteDescription,
    url: "/",
    siteName: "Axis Visual Lab",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Axis Visual Lab | Creative & Tech Studio",
    description: siteDescription,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Axis Visual Lab",
  url: siteUrl,
  email: "info@axisvisuallab.com",
  description: siteDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
