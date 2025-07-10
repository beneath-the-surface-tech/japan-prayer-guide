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
                acc.isLive.push(relatedPage.isLive)
            }
            return acc
        },
        { labels: [], links: [], thumbs: [], isLive: [] } as {
            labels: string[]
            links: string[]
            thumbs: string[]
            isLive: boolean[]
        },
    )

    const prevTopicNumber = ((Number(topicPage?.topicNumber) - 2 + 30) % 30) + 1 // wrap around 1 -> 30
    const nextTopicNumber = (Number(topicPage?.topicNumber) % 30) + 1 // wrap around 30 -> 1

    const [prevTopicPath, nextTopicPath] = [prevTopicNumber, nextTopicNumber].map((topicNumber: number) => {
        return pages.find((page) => Number(page.topicNumber) == topicNumber)?.path
    })

    const topicLocaleData = {
        prevTopicPath: prevTopicPath,
        nextTopicPath: nextTopicPath,
        title: topicLocale?.title,
        path: topicPage?.path,
        prayerSummary: topicLocale?.prayerSummary,
        textBody: topicLocale?.textBody,
        textBodyAsterisk: topicLocale?.textBodyAsterisk,
        references: topicLocale?.references ?? "",
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
            .sort((a, b) => a.order - b.order)
            .map((photo) => ({
                src: `https://d3rljda0pe0qw5.cloudfront.net/uploads/${photo.photo.image_name}`,
                title: photo.photo?.[locale as "en" | "ja"],
                alt: photo.photo?.[`alt_${locale}` as "alt_en" | "alt_ja"],
            })),
        uncroppedPhotos: topicPage?.photos
            .filter((photo) => photo.type === "uncropped")
            .sort((a, b) => a.order - b.order)
            .map((photo) => ({
                src: `https://d3rljda0pe0qw5.cloudfront.net/uploads/${photo.photo.image_name}`,
                title: photo.photo?.[locale as "en" | "ja"],
                alt: photo.photo?.[`alt_${locale}` as "alt_en" | "alt_ja"],
            })),
        related,
        timelineEras:
            topicPage?.timelineEras?.map((era) => ({
                id: era.id,
                title: era[`title_${locale}` as "title_en" | "title_ja"],
                era: era.era,
                events: era.events
                    ?.sort((a, b) => a.order - b.order)
                    .map((event) => ({
                        id: event.id,
                        year: event.year,
                        title: event.title,
                        order: event.order,
                        text_body: event[`text_body_${locale}` as "text_body_en" | "text_body_ja"],
                        galleryType: event.gallery_type,
                        bgVariant: event.bg_variant,
                        photos: event.photos
                            ?.sort((a, b) => a.order - b.order)
                            .map((photo) => ({
                                id: photo.id,
                                order: photo.order,
                                src: `https://d3rljda0pe0qw5.cloudfront.net/uploads/${photo.photo?.image_name}`,
                                title: photo.photo?.[locale as "en" | "ja"] || null,
                                alt: photo.photo?.[`alt_${locale}` as "alt_en" | "alt_ja"] || null,
                            })),
                    })),
            })) || [],
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
    const isDevEnv = process.env.IS_DEV_ENV === "true" || isDev

    topicOverview.cultureTopics = cultureTopics.map((topic) => {
        const topicLocale = topic.topics.find((topic) => topic.locale === locale)
        const isDevLive = typeof topic.isDevLive === "boolean" ? topic.isDevLive : topic.isLive

        return {
            label: topicLocale?.title,
            link: topic.path,
            disabled: isDevEnv ? !isDevLive : !topic.isLive,
            image: topic.heroPhoto,
        }
    })
    topicOverview.churchTopics = churchTopics.map((topic) => {
        const topicLocale = topic.topics.find((topic) => topic.locale === locale)
        const isDevLive = typeof topic.isDevLive === "boolean" ? topic.isDevLive : topic.isLive

        return {
            label: topicLocale?.title,
            link: topic.path,
            disabled: isDevEnv ? !isDevLive : !topic.isLive,
            image: topic.heroPhoto,
        }
    })

    return topicOverview
}
