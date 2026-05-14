import type { Metadata } from "next";
import { Baloo_2, Geist_Mono, Geist } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/next"


const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recurring TO-DOs",
  description: "A local-first recurring obligations tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", baloo.variable, geistMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <I18nProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </I18nProvider>

        <Analytics />
      </body>
    </html>
  );
}
