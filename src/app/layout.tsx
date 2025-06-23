import type { Metadata } from "next";
// Using GeistSans and GeistMono is the more conventional import from 'geist/font'
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./styles/globals.css";

/**
 * Enhanced metadata for better SEO and social media sharing.
 * The `title.template` allows individual pages to set their own titles
 * while maintaining a consistent brand suffix.
 */
export const metadata: Metadata = {
  title: {
    default: "Raihan Athallah | Backend Developer",
    template: "%s | Raihan Athallah",
  },
  description: "Portfolio of Raihan Athallah, a passionate Backend Developer and Database Enthusiast building scalable systems and dynamic web applications.",
  // Add Open Graph metadata for rich link previews on social media
  openGraph: {
    title: "Raihan Athallah | Backend Developer",
    description: "Explore the portfolio of Raihan Athallah, showcasing projects in backend development, database architecture, and more.",
    // You should replace this with a URL to a specific image for sharing
    // images: ['/og-image.png'],
    url: "https://your-domain.com", // Replace with your actual domain
    siteName: "Raihan Athallah's Portfolio",
    locale: "en_US",
    type: "website",
  },
  // Add Twitter-specific metadata
  twitter: {
    card: "summary_large_image",
    title: "Raihan Athallah | Backend Developer",
    description: "Portfolio of Raihan Athallah, a passionate Backend Developer and Database Enthusiast.",
    // images: ['/twitter-image.png'], // Replace with a URL to a Twitter-specific image
  },
  // Useful for SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/**
 * The RootLayout now provides a clean slate for child pages.
 * It sets up global fonts, background color, and text color on the <body> tag,
 * but does NOT enforce any specific layout like centering or padding.
 * This allows each page component (like your Home page) to fully control its own structure.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans bg-gray-900 text-gray-200 antialiased`}>{children}</body>
    </html>
  );
}
