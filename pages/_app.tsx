import { AppProps } from "next/app"
import { appWithTranslation } from "next-i18next"
import { Analytics } from "@vercel/analytics/react"
import "../styles/main.scss"
import nextI18nextConfig from "../next-i18next.config"

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
            <Analytics />
        </>
    )
}

export default appWithTranslation(App, nextI18nextConfig)
