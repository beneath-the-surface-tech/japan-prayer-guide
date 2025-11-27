import { getPlaiceholder } from "plaiceholder"
import fs from "fs"

// Generates blurData for "placeholder = 'blur'" on next/images. Since they are unlikely to be changed often, it's better to just
// pre-generate and upload to retool. This is notably used on the `pages` table under `blurDataUrl` column

const images = [
    { key: "1 - Popular religious practices", url: "https://d3rljda0pe0qw5.cloudfront.net/uploads/TP01-Hero.jpg" },
    {
        key: "2 - Japanese views of Christianity",
        url: "https://prayforjapan.retool.com/api/file/ebaf64d5-2461-47cb-ac5d-5f5123f935dd",
    },
    {
        key: "3 - Japanese culture and Christianity",
        url: "https://prayforjapan.retool.com/api/file/15824e9c-5eb6-4855-986e-ee0d34479a17",
    },
    { key: "4 - Ancestor veneration", url: "https://www.japanprayerguide.com/photos/topics/topic4/TP04-Hero.jpg" },
    { key: "5 - Harmony", url: "https://prayforjapan.retool.com/api/file/070f6ff3-3292-4d5e-bac8-ccfe8b90d814" },
    { key: "6 - Social conformity", url: "https://www.japanprayerguide.com/photos/topics/topic6/TP06-Hero.jpg" },
    {
        key: "7 - Self-reliance and materialism",
        url: "https://prayforjapan.retool.com/api/file/48b22aff-df56-45cb-8727-83302ff28117",
    },
    {
        key: "8 - Mental and emotional health",
        url: "https://www.japanprayerguide.com/photos/topics/topic8/TP08-Hero.jpg",
    },
    { key: "9 - Aging society", url: "https://prayforjapan.retool.com/api/file/d7cc79e2-7548-4f35-9c9f-56e52a91a3d5" },
    {
        key: "10 - Politics and international relations",
        url: "https://www.japanprayerguide.com/photos/topics/topic10/TP10-Hero.jpg",
    },
    {
        key: "11 - Immigration and foreign nationals",
        url: "https://prayforjapan.retool.com/api/file/69bba383-1333-448a-9e83-aa91d3c2c14a",
    },
    { key: "12 - Natural disasters", url: "https://d3rljda0pe0qw5.cloudfront.net/uploads/TP12-Hero-New.jpg" },
    {
        key: "13 - Technology and media",
        url: "https://prayforjapan.retool.com/api/file/9557f0b2-4259-4176-89b3-61ccef9709fc",
    },
    {
        key: "14 - Workplace pressure",
        url: "https://prayforjapan.retool.com/api/file/302d3b4b-fbc2-4460-9e63-d0f32204bcf9",
    },
    { key: "15 - Family life", url: "https://prayforjapan.retool.com/api/file/b239bb94-0716-412c-8c75-af4deed04500" },
    {
        key: "16 - Youth and young adults",
        url: "https://prayforjapan.retool.com/api/file/6913d13c-2e54-45d6-8c77-60e2d5ae3e65",
    },
    {
        key: "17 - Struggling churches",
        url: "https://prayforjapan.retool.com/api/file/3504b843-3fa0-4aad-8f70-8bd952d7c4d3",
    },
    {
        key: "18 - Church planting",
        url: "https://prayforjapan.retool.com/api/file/8ac620c8-99e9-4622-b6f9-bae8b787ecf9",
    },
    { key: "19 - Church leadership", url: "https://www.japanprayerguide.com/photos/topics/topic19/TP19-Hero.jpg" },
    {
        key: "20 - Church in the community",
        url: "https://prayforjapan.retool.com/api/file/c2dfdf01-0761-4d2b-a772-1d7ed42c7470",
    },
    {
        key: "21 - Creative ways of ministry",
        url: "https://prayforjapan.retool.com/api/file/8e0bc841-c2b2-46c1-8a7e-07091d0fcafc",
    },
    {
        key: "22 - Christianity in rural areas",
        url: "https://prayforjapan.retool.com/api/file/e2c998c5-3b62-435d-9717-df783edd351d",
    },
    {
        key: "23 - Personal evangelism",
        url: "https://prayforjapan.retool.com/api/file/6ff17bab-7c08-43d8-b8ed-5404b3faf5e3",
    },
    {
        key: "24 - Faith in the workplace",
        url: "https://prayforjapan.retool.com/api/file/cbcccfd4-7cb6-49f4-bd1f-d9ca3f1267a9",
    },
    {
        key: "25 - Daily Christian life and faith",
        url: "https://prayforjapan.retool.com/api/file/8e8a0992-66ef-423e-8ad0-ae9fb9bd411e",
    },
    {
        key: "26 - Japanese overseas",
        url: "https://prayforjapan.retool.com/api/file/b53dedec-7bb5-41d6-85da-f173f942213b",
    },
    { key: "27 - Missionary life", url: "https://d3rljda0pe0qw5.cloudfront.net/uploads/TP27-Hero.jpg" },
    { key: "28 - Unity in Christ", url: "https://www.japanprayerguide.com/photos/topics/topic28/TP28-Hero.jpg" },
    { key: "29 - Japanese mission movement", url: "https://d3rljda0pe0qw5.cloudfront.net/uploads/TP29-Hero.jpeg" },
    {
        key: "30 - Prayer for spiritual breakthrough",
        url: "https://prayforjapan.retool.com/api/file/38a5b38b-945e-4ce3-912a-15e81c90040e",
    },
]

;(async () => {
    const output: Record<string, any> = {}
    for (const { key, url } of images) {
        const buffer = await fetch(url).then((res) => res.arrayBuffer())
        const { base64 } = await getPlaiceholder(Buffer.from(buffer))
        output[key] = base64
    }
    fs.writeFileSync("blurData.json", JSON.stringify(output, null, 2))
})()
