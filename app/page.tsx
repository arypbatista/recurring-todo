import { Metadata } from "next";
import App from "./_components/App";

export const metadata: Metadata = {
  metadataBase: new URL("https://recurring-todo.vercel.app"),

  title: {
    default: "Recurring TO-DOs",
    template: "%s | Recurring TO-DOs",
  },

  description: "A local-first recurring obligations tracker",
  applicationName: "Recurring TO-DOs",

  keywords: ["recurring", "todo", "tracker", "obligations", "local-first"],

  category: "productivity",

  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false
    }
  },

  openGraph: {
    title: "Recurring TO-DOs",
    description: "A local-first recurring obligations tracker",
    url: "https://recurring-todo.vercel.app",
    siteName: "Recurring TO-DOs",
    images: [
      {
        url: "https://recurring-todo.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Recurring TO-DOs",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Recurring TO-DOs",
    description: "A local-first recurring obligations tracker",
    images: ["https://recurring-todo.vercel.app/og-image.png"],
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },

  other: {
    "google-site-verification": "YOUR_VERIFICATION_CODE",
    "Content-Security-Policy": "default-src 'self'; img-src 'self' data:; script-src 'none'; style-src 'none'; object-src 'none';",
  }



}

export default function Home() {
  return <App />;
}
