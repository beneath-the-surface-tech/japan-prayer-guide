import fs from "fs"
import { resolve } from "path"
import { unstable_cache } from "next/cache"
import { NextResponse } from "next/server"
import { getDataSource } from "../../../entities/datasource"
import { PageEntity } from "../../../entities"
import { mapById } from "../../../utils/objects"

const getPages = unstable_cache(
    async () => {
        const dataSource = getDataSource()
        await dataSource.initialize()

        const pageRepository = dataSource.getRepository(PageEntity)

        const pages = await pageRepository.find({
            relations: {
                photos: {
                    photo: true,
                },
                topics: true,
                relatedPages: true,
            },
        })

        await dataSource.destroy()

        return pages
    },
    ["pages"],
    { tags: ["pages"] },
)

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params

    if (!path) {
        return NextResponse.json({ status: 400, message: "Invalid path parameter" })
    }

    const [locale, ...pagePath] = path

    // Only fetch pages from Retool DB if the path is for a topic.
    if (pagePath.includes("topics")) {
        const topic = pagePath.join("/").replace(".json", "")
        const pages = await getPages()
        const pagesMap = mapById(pages)
        const topicPage = pages.find((page) => page.path.includes(topic))
        const topicLocale = topicPage?.topics.find((topic) => topic.locale === locale)
        const relatedPages = topicPage?.relatedPages.map((related) => related.relatedPageId)
        const related = relatedPages?.reduce(
            (acc, relatedPageId) => {
                const relatedPage = pagesMap[relatedPageId]
                const relatedTopicLocale = relatedPage?.topics.find((topic) => topic.locale === locale)
                if (relatedTopicLocale) {
                    acc.labels.push(relatedTopicLocale.title)
                    acc.links.push(relatedPage.path)
                    acc.thumbs.push(relatedPage.thumbnail ?? "")
                }
                return acc
            },
            { labels: [], links: [], thumbs: [] } as { labels: string[]; links: string[]; thumbs: string[] },
        )

        const topicLocaleData = {
            title: topicLocale?.title,
            path: topicPage?.path,
            prayerSummary: topicLocale?.prayerSummary,
            textBody: topicLocale?.textBody,
            textBodyAsterisk: topicLocale?.textBodyAsterisk,
            quote: topicLocale?.quote,
            downloads: topicLocale?.downloads,
            galleryType: topicPage?.galleryType,
            blockOrder: topicPage?.blockOrder,
            videoSrc: topicLocale?.videoSrc,
            infographic: topicLocale?.infographic,
            heroPhoto: topicPage?.heroPhoto,
            heroFocus: topicPage?.heroFocus,
            photos: topicPage?.photos.map((photo) => ({
                src: `https://prayforjapan.retool.com/api/file/${photo.photo.image_id}`,
                title: photo.photo?.[locale as "en" | "ja"],
            })),
            related,
        }

        return NextResponse.json(topicLocaleData)
    }

    // For other paths, get the locale json file from the public folder.
    const filePath = resolve(process.cwd(), `./public/locales/${path.join("/")}`)
    const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"))

    return NextResponse.json(fileData)
}
