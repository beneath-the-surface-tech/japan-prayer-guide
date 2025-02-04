import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"
import "server-only"

export async function POST(req: Request) {
    const { tags } = await req.json()

    if (tags?.length) {
        tags.forEach((tag: string) => {
            revalidateTag(tag)
        })
    }

    return NextResponse.json({ status: 200, message: "Revalidated" })
}
