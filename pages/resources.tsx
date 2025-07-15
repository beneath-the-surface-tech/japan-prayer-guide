import React from "react"
import { ToggleHeader } from "../components/ToggleHeader"
import { Button, Container } from "react-bootstrap"
import { I18n, TFunction, Trans, useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Footer from "../components/Footer"
import Link from "next/link"
import nextI18nextConfig from "../next-i18next.config"
import AppHeader from "../components/common/AppHeader"
import resources from "../public/locales/en/resources.json"
import { LowHighImage } from "../components/LowHighImage"
import { StaticImageData } from "next/image"
import bannerHeroHighRes from "@/public/photos/resources/Resources-Hero.jpg"
import bannerHeroLowRes from "@/public/photos/resources/Resources-Hero-LowRes.jpg"
import byMediaType from "@/public/photos/resources/Resources-Media.jpg"
import byTopicEN from "@/public/photos/resources/Resources-Book-EN.jpg"
import byTopicJA from "@/public/photos/resources/Resources-Book-JP.jpg"
import tutImg1 from "@/public/photos/resources/Resources-gif-1.gif"
import tutImg2 from "@/public/photos/resources/Resources-gif-2.gif"
import DownloadablesGrid from "../components/common/DownloadablesGrid/DownloadablesGrid"
import { LinkFromJson } from "@/components/common/LinkFromJson"
import DownloadTypeFlexCol from "@/components/resources/DownloadTypeFlexCol/DownloadTypeFlexCol"
import TutorialFlexCol from "@/components/resources/TutorialFlexCol/TutorialFlexCol"
import { Info, Doc } from "@/components/icons"
import { useLayoutEffect } from "react"

export function useEqualHeight(
    className: string,
    mediaQuery = "(min-width: 1280px)", // default breakpoint
) {
    useLayoutEffect(() => {
        if (typeof window === "undefined") return // SSR guard
        const mql = window.matchMedia(mediaQuery)

        // Core equal-height logic, but gated by mql.matches
        const sync = () => {
            const els = Array.from(document.getElementsByClassName(className)) as HTMLElement[]

            if (!els.length) return
            if (!mql.matches) {
                // Below breakpoint ⇒ restore natural height
                els.forEach((el) => (el.style.height = ""))
                return
            }

            els.forEach((el) => (el.style.height = "auto")) // reset first
            const tallest = Math.max(...els.map((el) => el.offsetHeight))
            els.forEach((el) => (el.style.height = `${tallest}px`))
        }

        // Initial run and observers
        sync()
        const ro = new ResizeObserver(sync)
        const elsToWatch = Array.from(document.getElementsByClassName(className)) as HTMLElement[]
        elsToWatch.forEach((el) => ro.observe(el))

        window.addEventListener("resize", sync)
        mql.addEventListener("change", sync) // react to MQ flips

        // Cleanup
        return () => {
            window.removeEventListener("resize", sync)
            mql.removeEventListener("change", sync)
            ro.disconnect()
            elsToWatch.forEach((el) => (el.style.height = ""))
        }
    }, [className, mediaQuery])
}

// /** Makes every element with a given class name match the tallest one */
// export function useEqualHeight(className: string) {
//     useLayoutEffect(() => {
//         const els = Array.from(document.getElementsByClassName(className)) as HTMLElement[]
//         if (!els.length) return

//         const sync = () => {
//             // Reset any inline height so we get the natural size first
//             els.forEach((el) => (el.style.height = "auto"))
//             const tallest = Math.max(...els.map((el) => el.offsetHeight))
//             els.forEach((el) => (el.style.height = `${tallest}px`))
//         }

//         // 1. Initial run
//         sync()

//         // 2. Watch for content changes
//         const ro = new ResizeObserver(sync)
//         els.forEach((el) => ro.observe(el))

//         // 3. Handle window resizing
//         window.addEventListener("resize", sync)

//         // Cleanup
//         return () => {
//             window.removeEventListener("resize", sync)
//             ro.disconnect()
//             els.forEach((el) => (el.style.height = ""))
//         }
//     }, [className])
// }

export const getStaticProps = async ({ locale }: { locale: string }) => {
    const isPageReady: boolean = resources.enabled

    return {
        props: {
            isPageReady,
            ...(await serverSideTranslations(locale, ["resources", "common"], nextI18nextConfig)),
            // Will be passed to the page component as props
            // About used in content, common used in header
        },
        revalidate: 30,
    }
}

const Downloads = ({ isPageReady }: { isPageReady: boolean }) => {
    const { t, i18n } = useTranslation("resources")
    const webpageTitle = t("webpageTitle", "Resources")

    return (
        <div>
            <AppHeader title={webpageTitle} description="tbd" pageType="website" />
            <main id="resources" role="main">
                <ToggleHeader />

                {isPageReady ? <Resources t={t} i18n={i18n} /> : <PageNotReady t={t} />}
                <Footer />
            </main>
        </div>
    )
}

const Resources: React.FC<{ t: TFunction; i18n: I18n }> = ({ t, i18n }) => {
    // Use the equal height hook to make elements with "equal-height" class the same height
    useEqualHeight("equal-height")

    const VIMEO_URL = "https://vimeo.com/japanprayerguide"
    const heroHeader: string = t("heroHeader")
    const heroSubtitle: string = t("heroSubtitle")
    const copyrightText: string = t("copyrightText")
    const copyrightUrl: string = t("copyrightUrl", "/")

    const byMediaOtherVersionUrl = t("byMediaOtherVersionUrl", "/")
    const byTopicBtnUrl = t("byTopicBtnUrl", "/")

    const infographicsUrl = t("byMediaUrls.infographicsUrl", "")
    const photographyUrl = t("byMediaUrls.photographyUrl", "")
    const pdfUrl = t("byMediaUrls.pdfUrl", "")
    const slidesUrl = t("byMediaUrls.slidesUrl", "")

    const tutHeading: string = t("tutHeading")
    const tutDescription: string = t("tutDescription")

    const bookletImgAltText: string = t("bookletImgAlt", "background picture of calm waves")
    const bookletRedirectHeading = t("bookletRedirectHeading")
    const bookletRedirectBtnText = t("bookletRedirectButtonText")

    const referencesHeading = t("referencesHeading")
    const referencesDescription = t("referencesDescription")

    const tutorialImages: StaticImageData[] = [tutImg1, tutImg2]

    return (
        <>
            {/* Hero Section */}
            <div
                id="resources-banner"
                className="w-100 mx-0 d-flex align-items-center justify-content-center flex-column position-relative"
                style={{ marginTop: "60px" }}
            >
                <LowHighImage
                    alt="about hero image"
                    highSrc={bannerHeroHighRes}
                    src={bannerHeroLowRes}
                    className="position-absolute top-0"
                    isMainImage={true}
                />

                <div className="resources-content-container d-flex flex-column align-items-center">
                    <h1 className="px-4 px-md-5 px-lg-4 text-white text-center">
                        <Trans>{heroHeader}</Trans>
                    </h1>
                    <p className="subtext px-4 px-md-5 px-lg-4 text-white text-center">
                        <Trans>{heroSubtitle}</Trans>
                    </p>
                </div>
            </div>

            {/* 'Download by' section */}
            <div id="downloadBy" className="w-100 d-flex align-items-center flex-column px-4 px-md-4 page-section">
                <div className="resources-content-container">
                    <p className="text-left">
                        <Trans
                            components={[
                                <LinkFromJson key="copyrightText0" href={copyrightUrl} />,
                                <LinkFromJson key="copyrightText1" href={copyrightUrl} />,
                            ]}
                        >
                            {copyrightText}
                        </Trans>
                    </p>
                    <div className="d-flex flex-column px-0 g-4 justify-content-center mw-100">
                        <div className="d-flex flex-xl-row flex-column justify-content-center mw-100 px-sm-0 px-md-0 gap-xl-4">
                            <DownloadTypeFlexCol
                                className="mx-auto mx-xl-0"
                                src={byMediaType}
                                imgAltKey="byMediaAltText"
                                contentClass="equal-height"
                                headingKey="byMediaHeading"
                                descriptionArrayKey="byMediaDescriptions"
                                descriptionUrlArray={["", VIMEO_URL]}
                            >
                                <DownloadablesGrid
                                    className="d-sm-flex row-cols-sm-2 px-0 my-1"
                                    infographicsUrl={infographicsUrl}
                                    photographyUrl={photographyUrl}
                                    pdfUrl={pdfUrl}
                                    slidesUrl={slidesUrl}
                                    rowCount={1}
                                />
                            </DownloadTypeFlexCol>
                            <DownloadTypeFlexCol
                                className="mx-auto mx-xl-0"
                                src={i18n.language === "en" ? byTopicEN : byTopicJA}
                                imgAltKey="byTopicAltText"
                                contentClass="equal-height"
                                headingKey="byTopicHeading"
                                descriptionArrayKey="byTopicDescriptions"
                            >
                                <div className="d-inline-flex">
                                    <Link
                                        className="text-white text-center bg-secondary-5 border-secondary-5 btn btn-primary topic-btn"
                                        href={byTopicBtnUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Trans t={t} i18nKey="byTopicBtn" />
                                    </Link>
                                </div>
                            </DownloadTypeFlexCol>
                        </div>
                        <hr />
                        <div>
                            <Info />
                            <a className="fw-bold text-secondary-5 cursor-pointer mx-1" href={byMediaOtherVersionUrl}>
                                <Trans t={t} i18nKey="byMediaOtherVersionText" components={[]} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* 'How to' section */}
            <div id="tutorial" className="bg-secondary-2 w-100 d-flex align-items-center flex-column page-section">
                <div className="resources-content-container">
                    <h1 className="mt-2 mb-4 pb-2 text-primary text-center">
                        <Trans>{tutHeading}</Trans>
                    </h1>
                    <p className="text-center">
                        <Trans>{tutDescription}</Trans>
                    </p>
                    <div className="container-gap d-flex flex-xl-row flex-column justify-content-center align-items-start mt-3">
                        {tutorialImages.map((img, idx) => {
                            const prefix = "tut" + (idx + 1)
                            return (
                                <TutorialFlexCol
                                    key={"img" + idx}
                                    src={img}
                                    imgAltKey={prefix + "AltText"}
                                    contentClass=""
                                    headingKey={prefix + "Heading"}
                                    descriptionArrayKey={prefix + "Descriptions"}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* References section */}
            <section id="references" className="page-section">
                <div className="resources-content-container">
                    <div className="d-flex align-items-start flex-md-row flex-column">
                        <div className="flex-shrink-0 align-self-start me-2">
                            <Doc />
                            {/* <FaRegFile style={{ width: "5rem", height: "5rem" }} /> */}
                        </div>
                        <div className="reference-text flex-grow-1 ms-md-3 ms-0 mt-3 mt-md-0">
                            <h1 className="text-primary">
                                <Trans>{referencesHeading}</Trans>
                            </h1>
                            <p>
                                <Trans components={[<LinkFromJson key="referencesDescription" href="/" />]}>
                                    {referencesDescription}
                                </Trans>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booklet banner section */}
            <section className="redirect-section d-flex align-items-center" title={bookletImgAltText}>
                <div className="resources-content-container text-center text-white">
                    <h1 className="mb-sm-3 mb-md-4">
                        <Trans>{bookletRedirectHeading}</Trans>
                    </h1>
                    <Link href="/booklet" locale={i18n.language}>
                        <Button className="bg-secondary-5 border-secondary-5 px-3 fw-bold">
                            <Trans>{bookletRedirectBtnText}</Trans>
                        </Button>
                    </Link>
                </div>
            </section>
        </>
    )
}

const PageNotReady: React.FC<{ t: TFunction }> = ({ t }) => {
    return (
        <Container className="w-100 d-flex flex-column align-items-center justify-content-center gap-4 sorryContainer text-center">
            <img alt={"We're sorry"} src="/sorry.png" height="150" />
            <div className="text-center sorryTitle">
                <Trans t={t} i18nKey="title" />
            </div>
            <div className="text-center sorryMsg">
                <Trans t={t} i18nKey="message" />
            </div>
            <Link href={"/"}>
                <Button className="text-secondary-5 border-secondary-5 bg-white">
                    <Trans t={t} i18nKey="back" />
                </Button>
            </Link>
        </Container>
    )
}

export default Downloads
