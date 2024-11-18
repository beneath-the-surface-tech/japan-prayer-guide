/* eslint-disable @typescript-eslint/no-var-requires */
const sass = require("sass-embedded")
const { i18n } = require("./next-i18next.config")

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        implementation: "sass-embedded",
        logger: sass.Logger.silent,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    reactStrictMode: true,
    i18n,
}

module.exports = nextConfig
