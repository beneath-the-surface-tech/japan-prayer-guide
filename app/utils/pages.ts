import { unstable_cache } from "next/cache"
import { PageEntity } from "../entities"
import { getDataSource } from "../entities/datasource"

export const getPages = unstable_cache(
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
