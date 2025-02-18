import { NextResponse } from "next/server"
import { getPages } from "@/app/utils/pages"

export async function GET() {
    const pages = await getPages()

    const topicPaths = pages.map((page) => {
        return page.path
    })

    return NextResponse.json(topicPaths)
}
