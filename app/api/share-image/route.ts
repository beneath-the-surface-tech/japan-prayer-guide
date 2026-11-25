import sharp from "sharp"
import { SHARE_IMAGE_HEIGHT, SHARE_IMAGE_SOURCE_HOSTS, SHARE_IMAGE_WIDTH } from "@/lib/shareImage"

/* Serves a small 1200x630 JPEG copy of a topic hero photo for link previews (og:image).
 * The originals are 1-4 MB, which is too big for many chat apps (WhatsApp, iMessage,
 * LINE, Messenger), so they show the card without a picture.
 * Only images from the hosts the topic photos live on are accepted.
 */

const MAX_SOURCE_BYTES = 30 * 1024 * 1024

export async function GET(request: Request) {
    const src = new URL(request.url).searchParams.get("src") ?? ""

    let sourceUrl: URL
    try {
        sourceUrl = new URL(src)
    } catch {
        return new Response("Invalid src", { status: 400 })
    }
    if (sourceUrl.protocol !== "https:" || !SHARE_IMAGE_SOURCE_HOSTS.includes(sourceUrl.hostname)) {
        return new Response("src host not allowed", { status: 400 })
    }

    const upstream = await fetch(sourceUrl)
    const contentLength = Number(upstream.headers.get("content-length") ?? 0)
    if (!upstream.ok || contentLength > MAX_SOURCE_BYTES) {
        return new Response("Could not load image", { status: 502 })
    }

    try {
        const source = Buffer.from(await upstream.arrayBuffer())
        const image = await sharp(source)
            .rotate()
            .resize(SHARE_IMAGE_WIDTH, SHARE_IMAGE_HEIGHT, { fit: "cover" })
            .jpeg({ quality: 80, mozjpeg: true })
            .toBuffer()

        return new Response(new Uint8Array(image), {
            headers: {
                "Content-Type": "image/jpeg",
                // Cache on the CDN so chat-app crawlers get a fast response after the first request
                "Cache-Control": "public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400",
            },
        })
    } catch {
        return new Response("Could not process image", { status: 502 })
    }
}
