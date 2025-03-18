import { unstable_cache } from "next/cache"
import { NextResponse } from "next/server"
import { getDataSource } from "../../entities/datasource"
import { PageEntity } from "../../entities"

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

export async function GET() {
    const pages = await getPages()

    return NextResponse.json(pages)
}
