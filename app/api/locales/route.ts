import { NextResponse } from "next/server"
import { getPages } from "@/app/utils/pages"

export async function GET() {
    const pages = await getPages()

    return NextResponse.json(pages)
}
