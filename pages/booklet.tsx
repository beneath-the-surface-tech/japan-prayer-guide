import Head from "next/head"
import Link from "next/link"
import React from "react"
import { ToggleHeader } from "../components/ToggleHeader"
import { Container, Row, Col, Button } from "react-bootstrap"
import { useTranslation, Trans } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Footer from "../components/Footer"
import ImagePagination from "../components/image-pagination/ImagePagination"
import OrderBook from "../components/common/OrderBook"
import BookPageImageEN1 from "../public/photos/booklet/pagination/en/Book - Slider 1 EN.jpg"
import BookPageImageEN2 from "../public/photos/booklet/pagination/en/Book - Slider 2 EN.jpg"
import BookPageImageEN3 from "../public/photos/booklet/pagination/en/Book - Slider 3 EN.jpg"
import BookPageImageEN4 from "../public/photos/booklet/pagination/en/Book - Slider 4 EN.jpg"
import BookPageImageEN5 from "../public/photos/booklet/pagination/en/Book - Slider 5 EN.jpg"
import BookPageImageJA1 from "../public/photos/booklet/pagination/ja/Book - Slider 1 JP.jpg"
import BookPageImageJA2 from "../public/photos/booklet/pagination/ja/Book - Slider 2 JP.jpg"
import BookPageImageJA3 from "../public/photos/booklet/pagination/ja/Book - Slider 3 JP.jpg"
import BookPageImageJA4 from "../public/photos/booklet/pagination/ja/Book - Slider 4 JP.jpg"
import BookPageImageJA5 from "../public/photos/booklet/pagination/ja/Book - Slider 5 JP.jpg"
import MobileBookPageImageEN1 from "../public/photos/booklet/pagination/en/en_Book_mweb-Slider 1.jpg"
import MobileBookPageImageEN2 from "../public/photos/booklet/pagination/en/en_Book_mweb-Slider 2.jpg"
import MobileBookPageImageEN3 from "../public/photos/booklet/pagination/en/en_Book_mweb-Slider 3.jpg"
import MobileBookPageImageEN4 from "../public/photos/booklet/pagination/en/en_Book_mweb-Slider 4.jpg"
import MobileBookPageImageEN5 from "../public/photos/booklet/pagination/en/en_Book_mweb-Slider 5.jpg"
import MobileBookPageImageEN6 from "../public/photos/booklet/pagination/en/en_Book_mweb-Slider 6.jpg"
import MobileBookPageImageEN7 from "../public/photos/booklet/pagination/en/en_Book_mweb-Slider 7.jpg"
import MobileBookPageImageEN8 from "../public/photos/booklet/pagination/en/en_Book_mweb-Slider 8.jpg"
import MobileBookPageImageEN9 from "../public/photos/booklet/pagination/en/en_Book_mweb-Slider 9.jpg"
import MobileBookPageImageEN10 from "../public/photos/booklet/pagination/en/en_Book_mweb-Slider 10.jpg"
import MobileBookPageImageJA1 from "../public/photos/booklet/pagination/ja/ja_Book_mweb-Slider 1.jpg"
import MobileBookPageImageJA2 from "../public/photos/booklet/pagination/ja/ja_Book_mweb-Slider 2.jpg"
import MobileBookPageImageJA3 from "../public/photos/booklet/pagination/ja/ja_Book_mweb-Slider 3.jpg"
import MobileBookPageImageJA4 from "../public/photos/booklet/pagination/ja/ja_Book_mweb-Slider 4.jpg"
import MobileBookPageImageJA5 from "../public/photos/booklet/pagination/ja/ja_Book_mweb-Slider 5.jpg"
import MobileBookPageImageJA6 from "../public/photos/booklet/pagination/ja/ja_Book_mweb-Slider 6.jpg"
import MobileBookPageImageJA7 from "../public/photos/booklet/pagination/ja/ja_Book_mweb-Slider 7.jpg"
import MobileBookPageImageJA8 from "../public/photos/booklet/pagination/ja/ja_Book_mweb-Slider 8.jpg"
import MobileBookPageImageJA9 from "../public/photos/booklet/pagination/ja/ja_Book_mweb-Slider 9.jpg"
import MobileBookPageImageJA10 from "../public/photos/booklet/pagination/ja/ja_Book_mweb-Slider 10.jpg"
import Image, { StaticImageData } from "next/image"
import NextImage from "../components/common/NextImage/NextImage"
import coverEN from "../public/photos/home/hp_cover-en.jpg"
import coverJA from "../public/photos/home/hp_cover-ja.jpg"
import bookGifEN from "../public/photos/booklet/BOOK_GIF-en.gif"
import bookGifJA from "../public/photos/booklet/BOOK_GIF-ja.gif"

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["booklet", "common"])),
            // Will be passed to the page component as props
            // About used in content, common used in header
        },
    }
}

interface PaginationSrcType {
    src: StaticImageData
    text?: string
}

const enDesktopImages: PaginationSrcType[] = [
    { src: BookPageImageEN1 },
    { src: BookPageImageEN2 },
    { src: BookPageImageEN3 },
    { src: BookPageImageEN4 },
    { src: BookPageImageEN5 },
]

const jaDesktopImages: PaginationSrcType[] = [
    { src: BookPageImageJA1 },
    { src: BookPageImageJA2 },
    { src: BookPageImageJA3 },
    { src: BookPageImageJA4 },
    { src: BookPageImageJA5 },
]

const enMobileImages: PaginationSrcType[] = [
    { src: MobileBookPageImageEN1 },
    { src: MobileBookPageImageEN2 },
    { src: MobileBookPageImageEN3 },
    { src: MobileBookPageImageEN4 },
    { src: MobileBookPageImageEN5 },
    { src: MobileBookPageImageEN6 },
    { src: MobileBookPageImageEN7 },
    { src: MobileBookPageImageEN8 },
    { src: MobileBookPageImageEN9 },
    { src: MobileBookPageImageEN10 },
]
const jaMobileImages: PaginationSrcType[] = [
    { src: MobileBookPageImageJA1 },
    { src: MobileBookPageImageJA2 },
    { src: MobileBookPageImageJA3 },
    { src: MobileBookPageImageJA4 },
    { src: MobileBookPageImageJA5 },
    { src: MobileBookPageImageJA6 },
    { src: MobileBookPageImageJA7 },
    { src: MobileBookPageImageJA8 },
    { src: MobileBookPageImageJA9 },
    { src: MobileBookPageImageJA10 },
]

function useBetterMediaQuery(query: string) {
    const [matches, setMatches] = React.useState<boolean>()

    React.useEffect(() => {
        const mediaQueryList = window.matchMedia(query)
        const listener = () => setMatches(!!mediaQueryList.matches)
        listener()
        mediaQueryList.addEventListener("change", listener)
        return () => mediaQueryList.removeEventListener("change", listener)
    }, [query])

    return matches
}

const TabletOrMobileMediaQuery = "(min-width: 992px)"
const Booklet: React.FC = () => {
    const { t, i18n } = useTranslation("booklet")
    const webpageTitle = t("webpageTitle", "Booklet")
    const introTextParagraphs: string[] = t("introText", { returnObjects: true })
    const isTabletOrMobile = useBetterMediaQuery(TabletOrMobileMediaQuery)
    const isInEnglish = i18n.language === "en"
    let sampleBookImages
    if (isInEnglish) {
        if (isTabletOrMobile) {
            sampleBookImages = enDesktopImages
        } else {
            sampleBookImages = enMobileImages
        }
    } else {
        if (isTabletOrMobile) {
            sampleBookImages = jaDesktopImages
        } else {
            sampleBookImages = jaMobileImages
        }
    }

    return (
        <div>
            <Head>
                <title>{webpageTitle}</title>
                <meta name="description" content="Japan prayer guide" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content={webpageTitle} />
                <meta property="og:description" content="30 ways to pray for Japan" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={coverEN.src} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ToggleHeader />
            <main id="booklet" role="main">
                <div className="w-100 book-description position-relative" style={{ marginTop: "60px" }}>
                    <Container>
                        <Row xs={1} sm={1} md={1} xl={2}>
                            <Col className="my-5">
                                <NextImage
                                    className="book-image book-front-cover"
                                    src={i18n.language == "en" ? coverEN : coverJA}
                                    alt={t("bookImageAlt")!}
                                />
                            </Col>
                            <Col className="d-flex align-items-center">
                                <div className="book-text">
                                    <h1>
                                        <Trans t={t} i18nKey="heading" />
                                    </h1>
                                    <p className="book-subheading">
                                        <Trans t={t} i18nKey="subheading" />
                                    </p>
                                    {introTextParagraphs.map((text: string, idx: number) => (
                                        <p key={idx + text} className="book-introText">
                                            <Trans>{text}</Trans>
                                        </p>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Container id="prayer-sample" className="py-5">
                    <Container className="page-container py-3">
                        <ImagePagination pages={sampleBookImages} TabletOrMobileMediaQuery={TabletOrMobileMediaQuery} />
                    </Container>
                </Container>
                <Container className="booklet-gif mb-5">
                    <Image
                        className="w-100 px-10"
                        alt="physical booklet preview"
                        src={i18n.language === "en" ? bookGifEN : bookGifJA}
                    />
                </Container>
                <OrderBook />
                <section className="redirect-section d-flex align-items-center" style={{ height: "25rem" }}>
                    <Container className="text-center">
                        <h1>
                            <Trans t={t} i18nKey="prayerRedirectHeading" />
                        </h1>
                        <Link href="/topics/all" locale={i18n.language}>
                            <Button className="text-white">
                                <Trans t={t} i18nKey="prayerRedirectButtonText" />
                            </Button>
                        </Link>
                    </Container>
                </section>
                <Footer />
            </main>
        </div>
    )
}

export default Booklet
