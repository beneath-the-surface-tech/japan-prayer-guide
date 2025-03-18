import { AppProps } from "next/app"
import { appWithTranslation } from "next-i18next"
import { Analytics } from "@vercel/analytics/react"
import "../styles/main.scss"
import nextI18nextConfig from "../next-i18next.config"
import { ClearCacheButton } from "@/components/dev/ClearCacheButton"

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
            <Analytics />
            {process.env.NODE_ENV === "development" && <ClearCacheButton />}
        </>
    )
}

export default appWithTranslation(App, nextI18nextConfig)
