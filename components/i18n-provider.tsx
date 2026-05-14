"use client"

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react"

import {
    detectLocale,
    t as translate,
    type Locale,
    type TranslationKey,
} from "@/lib/i18n"

type I18nContextValue = {
    locale: Locale
    setLocale: (locale: Locale) => void
    t: (key: TranslationKey, replacements?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

type I18nProviderProps = {
    children: ReactNode
    initialLocale: Locale
}

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
    const [locale, setLocale] = useState<Locale>(initialLocale)

    useEffect(() => {
        const detected = detectLocale()
        setLocale(detected)

        // Optional: keep <html lang=""> synced
        document.documentElement.lang = detected
    }, [])

    const t = useCallback(
        (key: TranslationKey, replacements?: Record<string, string | number>) => {
            return translate(key, locale, replacements)
        },
        [locale]
    )

    const value = useMemo(
        () => ({
            locale,
            setLocale,
            t,
        }),
        [locale, t]
    )

    return (
        <I18nContext.Provider value={value}>
            {children}
        </I18nContext.Provider>
    )
}

export function useI18n() {
    const context = useContext(I18nContext)

    if (!context) {
        throw new Error("useI18n must be used within an I18nProvider")
    }

    return context
}