import Head from "next/head"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { absoluteUrl, SHARE_IMAGE_HEIGHT, SHARE_IMAGE_WIDTH } from "@/lib/shareImage"

interface AppHeaderProps {
    title: string
    description: string
    pageType: string
    /** Link-preview image. Expected to be a 1200x630 JPEG (see lib/shareImage.ts). */
    image?: string
    /** Set to false when `image` is not a 1200x630 share image, so no size is claimed for it */
    imageIsShareSize?: boolean
}

const OG_LOCALES: Record<string, string> = { en: "en_US", ja: "ja_JP" }

/* Absolute URLs are built from NEXT_PUBLIC_BASE_URL:
 *  local -> uses .env.local's NEXT_PUBLIC_BASE_URL
 *  preview, dev -> uses pre-prod NEXT_PUBLIC_BASE_URL (tied to VERCEL_URL)
 *  prod -> uses prod NEXT_PUBLIC_BASE_URL (based on domain)
 */
const AppHeader = ({ title, description, pageType, image = "", imageIsShareSize = true }: AppHeaderProps) => {
    const { t } = useTranslation("common")
    const { asPath, locale, defaultLocale } = useRouter()
    const siteName = t("metaTitle", "Beneath the Surface")

    const path = asPath.split(/[?#]/)[0]
    const localePrefix = locale && locale !== defaultLocale ? `/${locale}` : ""
    const pageUrl = absoluteUrl((localePrefix + path).replace(/(.)\/$/, "$1"))
    const fullImageUrl = image ? absoluteUrl(image) : null
    const ogLocale = OG_LOCALES[locale ?? "en"] ?? OG_LOCALES.en

    return (
        <Head>
            {/* Common Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />

            {/* OpenGraph Meta Tags (link previews in chat apps and social sites) */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={pageType} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:url" content={pageUrl} />
            <meta property="og:locale" content={ogLocale} />
            {Object.values(OG_LOCALES)
                .filter((alternate) => alternate !== ogLocale)
                .map((alternate) => (
                    <meta key={alternate} property="og:locale:alternate" content={alternate} />
                ))}
            {fullImageUrl && <meta property="og:image" content={fullImageUrl} />}
            {fullImageUrl && <meta property="og:image:alt" content={title} />}
            {fullImageUrl && imageIsShareSize && <meta property="og:image:type" content="image/jpeg" />}
            {fullImageUrl && imageIsShareSize && <meta property="og:image:width" content={String(SHARE_IMAGE_WIDTH)} />}
            {fullImageUrl && imageIsShareSize && (
                <meta property="og:image:height" content={String(SHARE_IMAGE_HEIGHT)} />
            )}

            {/* Twitter/X and apps that read its tags */}
            <meta name="twitter:card" content={fullImageUrl ? "summary_large_image" : "summary"} />
        </Head>
    )
}

export default AppHeader
