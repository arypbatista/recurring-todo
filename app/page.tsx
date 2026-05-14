import { headers } from "next/headers"
import { Metadata, ResolvingMetadata } from "next";
import App from "./_components/App";
import { t } from "@/lib/i18n";

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const headersList = await headers()

  const host = headersList.get("host")
  const protocol =
    headersList.get("x-forwarded-proto") ||
    (process.env.NODE_ENV === "development" ? "http" : "https")

  const origin = `${protocol}://${host}`

  const url = origin


  const locale = host === 'recurring-todo.vercel.app' ? 'en' : 'es'


  const title = t('appTitle', locale)
  const description = t('appSubtitle', locale)


  return {
    metadataBase: new URL(url),

    title: {
      default: title,
      template: `%s | ${title}`,
    },

    description: description,
    applicationName: title,

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
      title: title,
      description: description,
      url: origin,
      siteName: title,
      images: [
        {
          url: `${origin}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [`${origin}/og-image.png`],
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
}

export default function Home() {
  return <App />;
}
