import type { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"
import { resolve } from "path"
import { unstable_cache } from "next/cache"

const getTopics = unstable_cache(
    async () => {
        const response = await fetch(`https://japan-prayer-guide.hasura.app/api/rest/pages`, {
            cache: "no-store",
            headers: {
                "x-hasura-admin-secret": "5GMMyTT0tuvEGBpkxTzJXnOlAKrIM65yd53wcNK6uPXV407Oq99ua6lWJDKVabQf",
                "content-type": "application/json",
            },
        })

        return response.json()
    },
    ["pages"],
    { revalidate: 3600 },
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let time = Date.now()

    if (req.method !== "GET") {
        return res.status(405).json({ status: 405, message: "Method Not Allowed" })
    }

    if (!req.query.path || !Array.isArray(req.query.path)) {
        return res.status(400).json({ status: 400, message: "Invalid path parameter" })
    }

    const [locale, ...pagePath] = req.query.path

    if (pagePath.includes("topics")) {
        const topic = pagePath.pop()?.replace(".json", "") as string
        const data = await getTopics()
        const pages = data.pages

        console.log("fetch took: ", Date.now() - time, "ms")
        time = Date.now()

        const topicPage = pages.find((page: any) => page.path === topic)
        const topicLocale = topicPage.topics.find((topic: any) => topic.locale === locale)

        const topicLocaleData = {
            title: topicLocale.title,
            path: topicPage.path,
            prayerSummary: topicLocale.prayerSummary,
            textBody: topicLocale.textBody,
            textBodyAsterisk: topicLocale.textBodyAsterisk,
            quote: topicLocale.quote,
            downloads: topicLocale.downloads,
            galleryType: topicPage.galleryType,
            blockOrder: topicPage.blockOrder,
            videoSrc: topicLocale.videoSrc,
            infographic: topicPage.infographic,
            heroPhoto: topicPage.heroPhoto,
            heroFocus: topicPage.heroFocus,
            photos: topicPage.pagePhotos.map((photo: any) => ({
                src: photo.photoImage.image,
                title: photo.photoImage?.[locale],
            })),
            related: { labels: [], links: [], thumbs: [] },
        }

        console.log("transform took: ", Date.now() - time, "ms")

        return res.status(200).json(topicLocaleData)
    }

    const filePath = resolve(process.cwd(), `./public/${req.url?.replace("/api", "")}`)
    const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"))

    console.log("file read took: ", Date.now() - time, "ms")

    res.status(200).json(fileData)
}
