/* eslint-disable @typescript-eslint/no-var-requires */
const sass = require("sass-embedded")
const { i18n } = require("./next-i18next.config")
const isDev = process.env.NODE_ENV === "development"

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        implementation: "sass-embedded",
        logger: sass.Logger.silent,
    },
    // assetPrefix: isDev ? undefined : "https://d3bmwz0l8kbz95.cloudfront.net",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    reactStrictMode: true,
    serverExternalPackages: ["typeorm"],
    i18n,
    webpack(config) {
      config.resolve.fallback = {

        // if you miss it, all the other options in fallback, specified
        // by next.js will be dropped.
        ...config.resolve.fallback,

        fs: false, // the solution
      };

      return config;
    }
}

module.exports = nextConfig
