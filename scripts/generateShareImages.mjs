// Generates the 1200x630 link-preview (og:image) images in public/share/.
// Chat apps (WhatsApp, iMessage, LINE, Messenger, Google Chat) drop previews whose
// image is too large, so these are kept small (well under 300 KB each).
//
// Run with: node scripts/generateShareImages.mjs
import sharp from "sharp"
import fs from "fs"
import path from "path"

const WIDTH = 1200
const HEIGHT = 630
const OUT_DIR = "public/share"
const JPEG = { quality: 80, mozjpeg: true }

// Each page's share image is its hero photo, cropped to 1200x630
const photos = [
    { src: "public/photos/home/hp_hero.png", out: "home.jpg" },
    { src: "public/photos/about/ABOUT-HERO-FullRes.jpg", out: "about.jpg" },
    { src: "public/photos/topic-nav/TOPNAV_HERO.jpg", out: "topics.jpg" },
    { src: "public/photos/resources/Resources-Hero.jpg", out: "resources.jpg" },
    { src: "public/photos/booklet/BOOKLET_HERO_FullRes.jpg", out: "booklet.jpg" },
]

async function main() {
    fs.mkdirSync(OUT_DIR, { recursive: true })

    for (const { src, out } of photos) {
        await sharp(src).resize(WIDTH, HEIGHT, { fit: "cover" }).jpeg(JPEG).toFile(path.join(OUT_DIR, out))
    }

    for (const file of fs.readdirSync(OUT_DIR)) {
        const kb = Math.round(fs.statSync(path.join(OUT_DIR, file)).size / 1024)
        console.log(`${file}: ${kb} KB`)
    }
}

main()
