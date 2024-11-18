/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check

const HttpBackend = require("i18next-http-backend")
const { unstable_cache } = require("next/cache")

const isBrowser = typeof window !== "undefined"
const isDev = process.env.NODE_ENV === "development"
const BASE_URL = isDev ? "http://localhost:3000" : "http://localhost:3000"

const getTranslations = unstable_cache(
    async (url) => {
        try {
            const response = await fetch(url)
            return response.json()
        } catch (error) {
            return {}
        }
    },
    ["translations"],
    { tags: ["translations"] },
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
    partialBundledLanguages: isBrowser && true,
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
    use: isBrowser ? [HttpBackend.default] : [HttpBackend],
    // use: [{ back}],

    /**
     * @link https://github.com/i18next/next-i18next#6-advanced-configuration
     */
    // saveMissing: false,
    // strictMode: true,
    // serializeConfig: false,
    react: {
        useSuspense: false,
        bindI18n: "languageChanged loaded",
        transKeepBasicHtmlNodesFor: ["i", "b", "sup", "br", "ul", "ol", "li"],
        transSupportBasicHtmlNodes: true,
    },
}
