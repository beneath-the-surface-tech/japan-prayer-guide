/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check

const HttpBackend = require("i18next-http-backend")
const { unstable_cache } = require("next/cache")

const isBrowser = typeof window !== "undefined"
const isDev = process.env.NODE_ENV === "development"
const BASE_URL = isDev ? "http://localhost:3000" : process.env.API_URL || "https://japan-prayer-guide-beta.vercel.app"

const RETOOL_PATHS = ["/topics/", "topic-overview"]

const getTranslations = unstable_cache(
    async (url) => {
        const fs = require("fs")
        const path = require("path")
        const { getTopicLocaleData, getTopicsOverviewLocaleData } = require("./app/utils/topics")

        const localePath = url.replace(BASE_URL, "").replace("/api/locales/", "")

        if (!RETOOL_PATHS.some(path => localePath.includes(path))) {
            const file = fs.readFileSync(path.join("public/locales", localePath), "utf8")
            return JSON.parse(file)
        }
        
        try {
            const response = await fetch(`${BASE_URL}/api/locales`, {
                next: {
                    tags: ["pages-locales"]
                }
            })
            const data = await response.json()

            if (localePath.includes("topic-overview")) {
                return getTopicsOverviewLocaleData(data, localePath, isDev)
            }

            return getTopicLocaleData(data, localePath)
        } catch (error) {
            return {}
        }
    },
    ["translations"],
    { tags: ["translations"], revalidate: isDev ? 1 : 60 * 60 * 24 },
)

/**
 * @type {import('next-i18next').UserConfig}
 */

module.exports = {
    // https://www.i18next.com/overview/configuration-options#logging
    debug: false,
    i18n: {
        defaultLocale: "en",
        locales: ["en", "ja"],
    },
    serializeConfig: false,
    /** To avoid issues when deploying to some paas (vercel...) */
    // localePath: typeof window === "undefined" ? require("path").resolve("./public/locales") : "/locales",
    reloadOnPrerender: true,
    backend: {
        loadPath: `${BASE_URL}/api/locales/{{lng}}/{{ns}}.json`,
        request: async function (
            /** @type {any} */ _options,
            /** @type {any} */ url,
            /** @type {any} */ _payload,
            /** @type {(arg0: null, arg1: { status: number; data: any; }) => void} */ callback,
        ) {
            callback(null, { status: 200, data: await getTranslations(url) })
        },
    },
    use: isBrowser ? [] : [HttpBackend],

    /**
     * @link https://github.com/i18next/next-i18next#6-advanced-configuration
     */
    // saveMissing: false,
    // strictMode: true,
    // serializeConfig: false,
    react: {
        useSuspense: false,
        bindI18n: "languageChanged loaded",
        transKeepBasicHtmlNodesFor: ["i", "b", "sup", "br", "ul", "ol", "li", "a", "span", "em"],
        transSupportBasicHtmlNodes: true,
    },
}
