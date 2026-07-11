import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import BackToTop from "@/components/BackToTop";
import RecaptchaProvider from "@/components/RecaptchaProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const PROFILE_NAME = "Muhammad Gale Adi Saputra";
const SITE_URL = "https://galeadi.vercel.app";
const PROFILE_BIO =
  "Cybersecurity undergraduate with a strong passion for technology, information security, and continuous learning.";

export const metadata: Metadata = {
  title: {
    default: `${PROFILE_NAME} | Portfolio`,
    template: `%s | ${PROFILE_NAME}`,
  },
  description: PROFILE_BIO,
  keywords: [
    "Software Developer",
    "Cybersecurity",
    "IT Student",
    "Tech Enthusiast",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "Tailwind CSS",
  ],
  authors: [{ name: PROFILE_NAME }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: `${PROFILE_NAME} | Portfolio`,
    description: PROFILE_BIO,
  },
  twitter: {
    card: "summary_large_image",
    title: `${PROFILE_NAME} | Portfolio`,
    description: PROFILE_BIO,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <MotionProvider>
          <RecaptchaProvider>
            {children}
          </RecaptchaProvider>
          <BackToTop />
        </MotionProvider>
      </body>
    </html>
  );
}
