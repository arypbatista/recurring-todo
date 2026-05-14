"use client";

import { useState } from "react";
import { MonthNavigation } from "@/components/month-navigation";
import { RecurringList } from "@/components/recurring-list";
import { AddEditDialog } from "@/components/add-edit-dialog";
import { BulkAddDialog } from "@/components/bulk-add-dialog";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import { RecurringTodo } from "@/types";
import { useI18n } from "@/components/i18n-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Metadata } from "next";

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
  const { t } = useI18n()

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<RecurringTodo | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(true);

  const handleOpenAddDialog = () => {
    setEditingTodo(null);
    setIsDialogOpen(true);
    setTooltipVisible(false)
  };

  const handleOpenEditDialog = (todo: RecurringTodo) => {
    setEditingTodo(todo);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen text-foreground pb-28 relative">
      {/* Decorative floating shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-pink-200/30 blur-2xl animate-float" />
        <div className="absolute top-1/4 -right-12 w-40 h-40 rounded-full bg-violet-200/25 blur-2xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 -left-16 w-36 h-36 rounded-full bg-amber-200/20 blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        <header className="pt-12 md:pt-8 pb-2">
          <div className="container max-w-2xl mx-auto px-5 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground leading-tight">
                <span className="animate-float inline-block mr-1.5">🌟</span>
                {t("appTitle")}
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">{t("appSubtitle")}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-2 border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
                onClick={() => setIsBulkDialogOpen(true)}
              >
                <Download className="w-4 h-4 mr-1.5" />
                {t('import')}
              </Button>
              <LanguageSwitcher />

            </div>
          </div>
        </header>

        <main className="container max-w-2xl mx-auto px-5 py-4">
          <MonthNavigation />

          <div className="mt-6">
            <RecurringList onEdit={handleOpenEditDialog} />
          </div>
        </main>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Tooltip open={tooltipVisible} >
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-105 animate-fab-pulse"
              onClick={handleOpenAddDialog}
            >
              <Plus className="h-6 w-6" />
              <span className="sr-only">{t('addRecurringTask')}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{t('tooltipTitle')}</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <AddEditDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editTodo={editingTodo}
      />

      <BulkAddDialog
        isOpen={isBulkDialogOpen}
        onOpenChange={setIsBulkDialogOpen}
      />

      {/* Footer disclaimer */}
      <footer className="relative z-10 pb-6 pt-12 text-center px-4">
        <p className="text-sm text-muted-foreground/70 flex justify-center gap-1.5">
          <span>🔒</span>
          {t('privacyNote')}
        </p>
        <p className="mt-4">
          <Button variant="link" className="underline" asChild>
            <Link href="https://github.com/arypbatista/recurring-todo" target="_blank">
              Github
            </Link>
          </Button>
        </p>
      </footer>
    </div>
  );
}
