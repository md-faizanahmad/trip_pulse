import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

export const metadata: Metadata = {
  metadataBase: appUrl ? new URL(appUrl) : undefined,
  title: {
    default: "TripPulse",
    template: "%s | TripPulse",
  },
  description:
    "TripPulse helps you discover destinations and plan smarter trips with useful travel information.",
  applicationName: "TripPulse",
  openGraph: {
    type: "website",
    siteName: "TripPulse",
    title: "TripPulse",
    description:
      "Discover destinations and plan smarter trips with useful travel information.",
  },
  twitter: {
    card: "summary",
    title: "TripPulse",
    description:
      "Discover destinations and plan smarter trips with useful travel information.",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
