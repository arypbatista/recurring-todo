"use client"

import { Check, Languages } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useI18n } from "@/components/i18n-provider"
import type { Locale } from "@/lib/i18n"

const languages: {
    code: Locale
    label: string
    nativeLabel: string
}[] = [
        {
            code: "en",
            label: "English",
            nativeLabel: "English",
        },
        {
            code: "es",
            label: "Spanish",
            nativeLabel: "Español",
        },
        {
            code: "pt",
            label: "Portuguese",
            nativeLabel: "Português",
        },
    ]

export function LanguageSwitcher() {
    const { locale, setLocale } = useI18n()

    const handleChange = (newLocale: Locale) => {
        setLocale(newLocale)

        localStorage.setItem("locale", newLocale)

        document.documentElement.lang = newLocale
    }

    const currentLanguage =
        languages.find((language) => language.code === locale) ?? languages[0]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-full"
                >
                    <Languages className="h-4 w-4" />
                    {currentLanguage.code.toUpperCase()}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
                {languages.map((language) => {
                    const active = locale === language.code

                    return (
                        <DropdownMenuItem
                            key={language.code}
                            onClick={() => handleChange(language.code)}
                            className="flex items-center justify-between"
                        >
                            <div className="flex flex-col">
                                <span>{language.nativeLabel}</span>
                                <span className="text-muted-foreground text-xs">
                                    {language.label}
                                </span>
                            </div>

                            {active && <Check className="h-4 w-4" />}
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}