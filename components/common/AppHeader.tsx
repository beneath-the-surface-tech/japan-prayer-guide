import Head from "next/head"

interface AppHeaderProps {
    title: string
    description: string
    pageType: string
    image?: string
}

const AppHeader = ({ title, description, pageType, image }: AppHeaderProps) => {
    /* Construct the absolute URL for the image.
     *  local, prod -> uses NEXT_PUBLIC_BASE_URL (either from .env.local or from vercel)
     *  preview, dev -> uses VERCEL_URL (since it's generated on deploy)
     */

    const nextPublicBaseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const baseUrl = nextPublicBaseUrl ? nextPublicBaseUrl : `https://${process.env.VERCEL_URL}`
    const fullImageUrl = image ? `${baseUrl}${image}` : null

    return (
        <Head>
            {/* Common Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />

            {/* OpenGraph Meta Tags */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={pageType} />
            {fullImageUrl && <meta property="og:image" content={fullImageUrl} />}
        </Head>
    )
}

export default AppHeader
