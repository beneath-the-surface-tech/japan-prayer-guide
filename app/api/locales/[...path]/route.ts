import fs from "fs"
import { resolve } from "path"
import { unstable_cache } from "next/cache"
import { NextResponse } from "next/server"
import { getDataSource } from "../../../entities/datasource"
import { PageEntity } from "../../../entities"
import { getTopicLocaleData } from "@/app/utils/topics"

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

    // Only fetch pages from Retool DB if the path is for a topic.
    if (path.includes("topics")) {
        const pages = await getPages()
        const topicLocaleData = getTopicLocaleData(pages, path.join("/"))

        return NextResponse.json(topicLocaleData)
    }

    // For other paths, get the locale json file from the public folder.
    const filePath = resolve(process.cwd(), `./public/locales/${path.join("/")}`)
    const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"))

    return NextResponse.json(fileData)
}
