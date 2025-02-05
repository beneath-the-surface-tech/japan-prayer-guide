import { mapById } from "./objects"
import type { PageEntity } from "../entities"
import fs from "fs/promises"
import path from "path"

export function getTopicLocaleData(pages: PageEntity[], localePath: string) {
    const locale = localePath.split("/").shift()
    const topic = localePath.split("/").slice(1).join("/").replace(".json", "")
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
                acc.thumbs.push(relatedPage.heroPhoto ?? "")
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
        photos: topicPage?.photos
            .filter((photo) => photo.type === "main")
            .map((photo) => ({
                src: `https://d3rljda0pe0qw5.cloudfront.net/uploads/${photo.photo.image_name}`,
                title: photo.photo?.[locale as "en" | "ja"],
                alt: photo.photo?.[`alt_${locale}` as "alt_en" | "alt_ja"],
            })),
        uncroppedPhotos: topicPage?.photos
            .filter((photo) => photo.type === "uncropped")
            .map((photo) => ({
                src: `https://d3rljda0pe0qw5.cloudfront.net/uploads/${photo.photo.image_name}`,
                title: photo.photo?.[locale as "en" | "ja"],
                alt: photo.photo?.[`alt_${locale}` as "alt_en" | "alt_ja"],
            })),
        related,
    }

    return topicLocaleData
}

export async function getTopicsOverviewLocaleData(pages: PageEntity[], localePath: string, isDev: boolean) {
    const locale = localePath.split("/").shift()
    const topicOverviewJson = await fs.readFile(path.join(process.cwd(), `./public/locales/${localePath}`))
    const topicOverview = JSON.parse(topicOverviewJson.toString())
    const pagesSorted = pages.sort((a, b) => parseInt(a.topicNumber) - parseInt(b.topicNumber))
    const cultureTopics = pagesSorted.filter((page) => page.category === "culture")
    const churchTopics = pagesSorted.filter((page) => page.category === "church")

    topicOverview.cultureTopics = cultureTopics.map((topic, i) => {
        const topicLocale = topic.topics.find((topic) => topic.locale === locale)

        return {
            label: topicLocale?.title,
            link: topic.path,
            disabled: isDev ? topicOverview.cultureTopics[i].disabled : !topic.isLive,
            image: topic.heroPhoto,
        }
    })
    topicOverview.churchTopics = churchTopics.map((topic, i) => {
        const topicLocale = topic.topics.find((topic) => topic.locale === locale)

        return {
            label: topicLocale?.title,
            link: topic.path,
            disabled: isDev ? topicOverview.churchTopics[i].disabled : !topic.isLive,
            image: topic.heroPhoto,
        }
    })

    return topicOverview
}
