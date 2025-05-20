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
import Image, { StaticImageData } from "next/image"
import ImageWithContentFlexCol, {
    TextPosition,
} from "../components/resources/ImageWithContentFlexCol/ImageWithContentFlexCol"

import bannerHeroHighRes from "../public/photos/about/about_hero.jpg"
import bannerHeroLowRes from "../public/photos/about/about_hero_LowRes.jpg"
import byMediaType from "../public/photos/about/about_02.png"
import byTopic from "../public/photos/about/about_03.png"
import tutImg1 from "../public/photos/about/about_02.png"
import tutImg2 from "../public/photos/about/about_03.png"
import tutImg3 from "../public/photos/about/about_02.png"
import DownloadablesGrid from "../components/common/DownloadablesGrid/DownloadablesGrid"
import { LinkFromJson } from "@/components/common/LinkFromJson"

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
    const VIMEO_URL = "https://vimeo.com/japanprayerguide"
    const heroHeader: string = t("heroHeader")
    const heroSubtitle: string = t("heroSubtitle")
    const copyrightText: string = t("copyrightText")
    const copyrightUrl: string = t("copyrightUrl")

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

    const tutorialImages: StaticImageData[] = [tutImg1, tutImg2, tutImg3]

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

                <h1 className="px-4 px-md-5 px-lg-4 text-white text-center w-75">
                    <Trans>{heroHeader}</Trans>
                </h1>
                <p className="subtext px-4 px-md-5 px-lg-4 text-white text-center w-75">
                    <Trans>{heroSubtitle}</Trans>
                </p>
            </div>

            {/* 'Download by' section */}
            <div id="downloadBy" className="w-100 pb-4 pb-md-5 pt-5 d-flex align-items-center flex-column px-4 px-md-4">
                <Container className="align-items-center">
                    <p className="common-p text-center">
                        <Trans
                            components={[
                                <LinkFromJson key="copyrightText0" href={copyrightUrl} />,
                                <LinkFromJson key="copyrightText1" href={copyrightUrl} />,
                            ]}
                        >
                            {copyrightText}
                        </Trans>
                    </p>

                    <Container className="d-flex flex-md-row flex-sm-column mw-100 px-sm-0 px-md-0">
                        <ImageWithContentFlexCol
                            className="px-sm-2 px-md-2"
                            src={byMediaType}
                            imgAltKey="byMediaAltText"
                            headingClass="fs-1"
                            headingKey="byMediaHeading"
                            descriptionArrayKey="byMediaDescriptions"
                            descriptionUrlArray={["", VIMEO_URL]}
                        >
                            <DownloadablesGrid
                                className="d-sm-flex row-cols-sm-2 px-0"
                                infographicsUrl={infographicsUrl}
                                photographyUrl={photographyUrl}
                                pdfUrl={pdfUrl}
                                slidesUrl={slidesUrl}
                            />

                            <p className="w-100 mt-3">
                                <Trans
                                    t={t}
                                    i18nKey="byMediaOtherVersionText"
                                    components={[<LinkFromJson key="byMediaOtherVersionText" href="/"></LinkFromJson>]}
                                />
                            </p>
                        </ImageWithContentFlexCol>
                        <ImageWithContentFlexCol
                            className="px-sm-2 px-md-2"
                            src={byTopic}
                            imgAltKey="byTopicAltText"
                            headingClass="fs-1"
                            headingKey="byTopicHeading"
                            descriptionArrayKey="byTopicDescriptions"
                        >
                            <div className="d-inline-flex">
                                <Link
                                    className="text-white text-center my-2 bg-secondary-5 border-secondary-5 btn btn-primary topic-btn"
                                    href="/"
                                >
                                    <Trans t={t} i18nKey="byTopicBtn" />
                                </Link>
                            </div>
                        </ImageWithContentFlexCol>
                    </Container>
                </Container>
            </div>

            {/* 'How to' section */}
            <div
                id="tutorial"
                className="bg-secondary-2 w-100 py-4 py-md-5 d-flex align-items-center flex-column px-4 px-md-4"
            >
                <Container className="align-items-center">
                    <h1 className="mt-2 mb-4 pb-2 text-primary text-center">
                        <Trans>{tutHeading}</Trans>
                    </h1>
                    <p className="common-p text-center">
                        <Trans>{tutDescription}</Trans>
                    </p>

                    <Container className="d-flex flex-column flex-lg-row">
                        {tutorialImages.map((img, idx) => {
                            const prefix = "tut" + (idx + 1)
                            return (
                                <ImageWithContentFlexCol
                                    key={"img" + idx}
                                    className="my-0 w-auto flex-sm-column flex-md-row flex-lg-column mb-sm-0 mb-md-0"
                                    src={img}
                                    imgAltKey={prefix + "AltText"}
                                    contentClass="px-md-4"
                                    headingClass="fs-2 ps-2 mb-3"
                                    headingKey={prefix + "Heading"}
                                    headerPosition={TextPosition.Below}
                                    descriptionArrayKey={prefix + "Descriptions"}
                                />
                            )
                        })}
                    </Container>
                </Container>
            </div>

            {/* References section */}
            <section id="references" className="py-4 py-md-5">
                <Container>
                    <h1 className="text-primary">
                        <Trans>{referencesHeading}</Trans>
                    </h1>
                    <p className="common-p">
                        <Trans components={[<LinkFromJson key="referencesDescription" href="/" />]}>
                            {referencesDescription}
                        </Trans>
                    </p>
                </Container>
            </section>

            {/* Booklet banner section */}
            <section className="redirect-section d-flex align-items-center" title={bookletImgAltText}>
                <Container className="text-center text-white">
                    <h1 className="mb-sm-3 mb-md-4">
                        <Trans>{bookletRedirectHeading}</Trans>
                    </h1>
                    <Link href="/booklet" locale={i18n.language}>
                        <Button className="bg-secondary-5 border-secondary-5 fw-bold">
                            <Trans>{bookletRedirectBtnText}</Trans>
                        </Button>
                    </Link>
                </Container>
            </section>
        </>
    )
}

const PageNotReady: React.FC<{ t: TFunction }> = ({ t }) => {
    return (
        <Container className="w-100 d-flex flex-column align-items-center justify-content-center gap-4 sorryContainer text-center">
            <Image alt={"We're sorry"} src="/sorry.png" height="150" />
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
