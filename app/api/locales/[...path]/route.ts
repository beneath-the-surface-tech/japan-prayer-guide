import fs from "fs"
import { resolve } from "path"
import { unstable_cache } from "next/cache"
import { NextResponse } from "next/server"

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
    { tags: ["pages"] },
)

export async function GET(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
    let time = Date.now()

    const { path } = await params

    if (!path) {
        return NextResponse.json({ status: 400, message: "Invalid path parameter" })
    }

    const [locale, ...pagePath] = path

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

        return NextResponse.json(topicLocaleData)
    }

    const filePath = resolve(process.cwd(), `./public/locales/${path.join("/")}`)
    const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"))

    console.log("file read took: ", Date.now() - time, "ms")

    return NextResponse.json(fileData)
}
