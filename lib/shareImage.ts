/* Link-preview (og:image) images are all 1200x630, the size chat apps and social sites expect.
 * Static pages use the pre-made files in public/share/ (see scripts/generateShareImages.mjs);
 * topic pages resize their hero photo on the fly through /api/share-image.
 */

export const SHARE_IMAGE_WIDTH = 1200
export const SHARE_IMAGE_HEIGHT = 630

/** Hosts the topic hero photos live on; /api/share-image only fetches from these */
export const SHARE_IMAGE_SOURCE_HOSTS = [
    "d3rljda0pe0qw5.cloudfront.net",
    "prayforjapan.retool.com",
    "www.japanprayerguide.com",
]

export const shareImages = {
    home: "/share/home.jpg",
    about: "/share/about.jpg",
    topics: "/share/topics.jpg",
    resources: "/share/resources.jpg",
    booklet: "/share/booklet.jpg",
}

/** Absolute URL on this site, as og:url and og:image require */
export const absoluteUrl = (path: string): string => {
    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path
    }
    return (process.env.NEXT_PUBLIC_BASE_URL ?? "") + path
}

/** Share image for a topic hero photo, resized to 1200x630.
 *  Returns null when the photo is on a host the resizer doesn't accept, so the caller can fall back. */
export const topicShareImage = (heroPhoto: string): string | null => {
    // Local hero photos are served from the production domain so the resizer can fetch them
    const source = heroPhoto.startsWith("/") ? "https://www.japanprayerguide.com" + heroPhoto : heroPhoto
    try {
        if (!SHARE_IMAGE_SOURCE_HOSTS.includes(new URL(source).hostname)) {
            return null
        }
    } catch {
        return null
    }
    return "/api/share-image?src=" + encodeURIComponent(source)
}
