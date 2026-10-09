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
  title: "Gryffindor Lab | Websites, Apps, Video & Graphic Design",
  description: siteDescription,
  keywords: [
    "Gryffindor Lab",
    "website development",
    "web design",
    "app development",
    "custom tech solutions",
    "video editing",
    "graphic design",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Gryffindor Lab | Creative & Tech Studio",
    description: siteDescription,
    url: "/",
    siteName: "Gryffindor Lab",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gryffindor Lab | Creative & Tech Studio",
    description: siteDescription,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Gryffindor Lab",
  url: siteUrl,
  email: "info@gryffindorlab.com",
  description: siteDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
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
