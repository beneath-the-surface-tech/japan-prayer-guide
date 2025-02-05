import fs from "fs"
import path from "path"
import i18nConfig from "../next-i18next.config.js"
import topics from "../public/locales/en/topic-overview.json"

// The file structure of the other (non-EN) locales should all still match, we just need a folder to scan through
const staticPageDirectory = path.join(process.cwd(), "public/locales/en/topics")

type StaticPathWithLocaleType = {
    params: {
        topicPage: string
    }
    locale: string
}

function getTopicPageIds() {
    // Returns an array that looks like this:
    // the attr under params HAS TO MATCH what is in [<this name>].tsx
    // [
    //   {
    //     params: {
    //       topicPage: 'ancestor-veneration'
    //     }, locale: "en"
    //   },
    //   {
    //     params: {
    //       topicPage: 'ancestor-veneration'
    //     }, locale: "ja"
    //   }
    // ]

    const loadedTopics = loadTopicsFromTopicOverview()

    let paths: StaticPathWithLocaleType[] = []
    const configLocales = i18nConfig.i18n.locales

    loadedTopics.map((topicLink) => {
        configLocales.forEach((lang) => {
            paths.push({
                params: {
                    topicPage: topicLink,
                },
                locale: lang,
            })
        })
    })

    return paths
}

function loadTopicsFromTopicOverview(): string[] {
    const filteredCultureTopics: string[] = topics.cultureTopics
        .filter((cultureTopics) => !cultureTopics.disabled)
        .map((cultureTopics) => cultureTopics.link)
    const filteredChurchTopics: string[] = topics.churchTopics
        .filter((churchTopic) => !churchTopic.disabled)
        .map((churchTopic) => churchTopic.link)

    return filteredCultureTopics.concat(filteredChurchTopics)
}

function loadTopicsFromDirectory(): string[] {
    // if using the directory method, considering adding back in .replace(/\.md$/, "")
    const fileNames = fs
        .readdirSync(staticPageDirectory, { withFileTypes: true })
        .filter((fsDirent) => fsDirent.isFile() && fsDirent.name.endsWith(".json"))
        .map((file) => file.name.substring(0, file.name.length - 5))
    return fileNames
}

export { getTopicPageIds }
