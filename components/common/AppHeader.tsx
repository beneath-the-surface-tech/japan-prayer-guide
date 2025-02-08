import Head from "next/head"

interface AppHeaderProps {
    title: string
    description: string
    pageType: string
    image?: string
}

const AppHeader = ({ title, description, pageType, image = "" }: AppHeaderProps) => {
    /* Construct the required absolute URL for the image.
     *  local -> uses .env.local's NEXT_PUBLIC_BASE_URL
     *  preview, dev -> uses pre-prod NEXT_PUBLIC_BASE_URL (tied to VERCEL_URL)
     *  prod -> uses prod NEXT_PUBLIC_BASE_URL (based on domain)
     */

    let fullImageUrl = null
    if (image) {
        // images from retool will be absolute rather than relative
        const isAbsoluteUrl = image.indexOf("http://") === 0 || image.indexOf("https://") === 0
        fullImageUrl = isAbsoluteUrl ? image : `${process.env.NEXT_PUBLIC_BASE_URL}${image}`
    }

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
