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
import bannerHeroHighRes from "@/public/photos/resources/Resources-Hero.jpg"
import bannerHeroLowRes from "@/public/photos/resources/Resources-Hero-LowRes.jpg"
import byMediaType from "@/public/photos/resources/Resources-Media.jpg"
import byTopicEN from "@/public/photos/resources/Resources-Book-EN.jpg"
import byTopicJA from "@/public/photos/resources/Resources-Book-JP.jpg"
import tutImg1 from "@/public/photos/resources/Resources-gif-1.gif"
import tutImg2 from "@/public/photos/resources/Resources-gif-2.gif"
import tutImg3 from "@/public/photos/resources/Resources-gif-3.gif"
import DownloadablesGrid from "../components/common/DownloadablesGrid/DownloadablesGrid"
import { LinkFromJson } from "@/components/common/LinkFromJson"
import DownloadTypeFlexCol from "@/components/resources/DownloadTypeFlexCol/DownloadTypeFlexCol"
import TutorialFlexCol from "@/components/resources/TutorialFlexCol/TutorialFlexCol"

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

                <h1 className="px-4 px-md-5 px-lg-4 text-white text-center w-75">
                    <Trans>{heroHeader}</Trans>
                </h1>
                <p className="subtext px-4 px-md-5 px-lg-4 text-white text-center w-75">
                    <Trans>{heroSubtitle}</Trans>
                </p>
            </div>

            {/* 'Download by' section */}
            <div id="downloadBy" className="w-100 d-flex align-items-center flex-column px-4 px-md-4 page-section">
                <p className="">
                    <Trans
                        components={[
                            <LinkFromJson key="copyrightText0" href={copyrightUrl} />,
                            <LinkFromJson key="copyrightText1" href={copyrightUrl} />,
                        ]}
                    >
                        {copyrightText}
                    </Trans>
                </p>
                <div className="d-flex flex-column px-0">
                {/* <div className="row g-4 justify-content-center"> */}
                        <div className="col-xl-6 col-lg-8 col-md-10 gap-xl-4">
                        {/* <div className="d-flex flex-xl-row flex-column justify-content-center mw-100 px-sm-0 px-md-0 gap-xl-4"> */}
                        {/* <div className="col-xl-6 col-lg-8 col-md-10"> */}
                            <DownloadTypeFlexCol
                            className="mx-auto mx-xl-0"
                                src={byMediaType}
                                imgAltKey="byMediaAltText"
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
                                />

                            <p className="w-100 mt-3 mt-md-4 mb-1">
                                <Trans
                                    t={t}
                                    i18nKey="byMediaOtherVersionText"
                                    components={[
                                        <LinkFromJson
                                            key="byMediaOtherVersionText"
                                            href={byMediaOtherVersionUrl}
                                        ></LinkFromJson>,
                                    ]}
                                />
                            </p>
                        </DownloadTypeFlexCol>
                        <DownloadTypeFlexCol
                            className="mx-auto mx-xl-0"
                            src={i18n.language === "en" ? byTopicEN : byTopicJA}
                            imgAltKey="byTopicAltText"
                            headingKey="byTopicHeading"
                            descriptionArrayKey="byTopicDescriptions"
                        >
                            <div className="d-inline-flex">
                                <Link
                                    className="text-white text-center my-2 bg-secondary-5 border-secondary-5 btn btn-primary topic-btn"
                                    href={byTopicBtnUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Trans t={t} i18nKey="byTopicBtn" />
                                </Link>
                            </div>
                        </DownloadTypeFlexCol>
                    </div>
                {/* </Container> */}
            </div>

            {/* 'How to' section */}
            <div
                id="tutorial"
                className="bg-secondary-2 w-100 d-flex align-items-center flex-column px-4 px-md-4 page-section"
            >
                <h1 className="mt-2 mb-4 pb-2 text-primary text-center">
                    <Trans>{tutHeading}</Trans>
                </h1>
                <p className="text-center">
                    <Trans>{tutDescription}</Trans>
                </p>
                <Container className="d-flex flex-column px-0">
                    <Container className="container-gap d-flex flex-xl-row flex-column justify-content-center align-items-start mt-3">
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
                    </Container>
                </Container>
            </div>

            {/* References section */}
            <section id="references" className="page-section">
                <Container>
                    <div className="d-flex align-items-start">
                        <div className="flex-shrink-0">
                            <ReferencesIcon />
                            {/* <FaRegFile style={{ width: "5rem", height: "5rem" }} /> */}
                        </div>
                        <div className="reference-text flex-grow-1 ms-3">
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
                </Container>
            </section>

            {/* Booklet banner section */}
            <section className="redirect-section d-flex align-items-center" title={bookletImgAltText}>
                <Container className="text-center text-white">
                    <h1 className="mb-sm-3 mb-md-4">
                        <Trans>{bookletRedirectHeading}</Trans>
                    </h1>
                    <Link href="/booklet" locale={i18n.language}>
                        <Button className="bg-secondary-5 border-secondary-5 px-3 fw-bold">
                            <Trans>{bookletRedirectBtnText}</Trans>
                        </Button>
                    </Link>
                </Container>
            </section>
        </>
    )
}

const ReferencesIcon = () => {
    return (
        <svg width="84" height="104" viewBox="0 0 84 104" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M81.7732 104H16.0144C15.5409 104 15.0868 103.812 14.7519 103.477C14.4171 103.142 14.229 102.688 14.229 102.215V32.5838C14.229 32.1102 14.4171 31.6561 14.7519 31.3213C15.0868 30.9865 15.5409 30.7984 16.0144 30.7984C16.4879 30.7984 16.9421 30.9865 17.2769 31.3213C17.6117 31.6561 17.7998 32.1102 17.7998 32.5838V100.429H79.9878V17.7984H32.5741C32.1005 17.7984 31.6464 17.6102 31.3116 17.2754C30.9768 16.9406 30.7887 16.4865 30.7887 16.0129C30.7887 15.5394 30.9768 15.0853 31.3116 14.7505C31.6464 14.4156 32.1005 14.2275 32.5741 14.2275H81.7732C82.2467 14.2275 82.7009 14.4156 83.0357 14.7505C83.3705 15.0853 83.5586 15.5394 83.5586 16.0129V102.215C83.5586 102.688 83.3705 103.142 83.0357 103.477C82.7009 103.812 82.2467 104 81.7732 104Z"
                fill="#002266"
            />
            <path
                d="M32.574 34.3692H16.0144C15.661 34.3695 15.3156 34.2649 15.0217 34.0687C14.7278 33.8726 14.4988 33.5936 14.3635 33.2672C14.2283 32.9408 14.1929 32.5816 14.2619 32.2351C14.3309 31.8886 14.5012 31.5703 14.7512 31.3206L31.3108 14.7609C31.5605 14.511 31.8788 14.3407 32.2253 14.2717C32.5718 14.2027 32.931 14.238 33.2574 14.3733C33.5839 14.5085 33.8628 14.7376 34.059 15.0315C34.2551 15.3253 34.3597 15.6708 34.3594 16.0241V32.5838C34.3594 33.0573 34.1713 33.5114 33.8365 33.8463C33.5017 34.1811 33.0475 34.3692 32.574 34.3692ZM20.3239 30.7984H30.7886V20.3247L20.3239 30.7984Z"
                fill="#002266"
            />
            <path
                d="M58.8774 42.3142H25.5193C25.0458 42.3142 24.5916 42.1261 24.2568 41.7913C23.922 41.4565 23.7339 41.0023 23.7339 40.5288C23.7339 40.0553 23.922 39.6012 24.2568 39.2663C24.5916 38.9315 25.0458 38.7434 25.5193 38.7434H58.8774C59.3509 38.7434 59.805 38.9315 60.1399 39.2663C60.4747 39.6012 60.6628 40.0553 60.6628 40.5288C60.6628 41.0023 60.4747 41.4565 60.1399 41.7913C59.805 42.1261 59.3509 42.3142 58.8774 42.3142Z"
                fill="#002266"
            />
            <path
                d="M63.3409 53.0601H25.5193C25.0458 53.0601 24.5916 52.872 24.2568 52.5371C23.922 52.2023 23.7339 51.7482 23.7339 51.2747C23.7339 50.8011 23.922 50.347 24.2568 50.0122C24.5916 49.6774 25.0458 49.4893 25.5193 49.4893H63.3409C63.8144 49.4893 64.2686 49.6774 64.6034 50.0122C64.9382 50.347 65.1263 50.8011 65.1263 51.2747C65.1263 51.7482 64.9382 52.2023 64.6034 52.5371C64.2686 52.872 63.8144 53.0601 63.3409 53.0601Z"
                fill="#002266"
            />
            <path
                d="M67.8044 63.8059H25.5193C25.0458 63.8059 24.5916 63.6178 24.2568 63.283C23.922 62.9482 23.7339 62.494 23.7339 62.0205C23.7339 61.547 23.922 61.0929 24.2568 60.758C24.5916 60.4232 25.0458 60.2351 25.5193 60.2351H67.8044C68.278 60.2351 68.7321 60.4232 69.0669 60.758C69.4017 61.0929 69.5898 61.547 69.5898 62.0205C69.5898 62.494 69.4017 62.9482 69.0669 63.283C68.7321 63.6178 68.278 63.8059 67.8044 63.8059Z"
                fill="#002266"
            />
            <path
                d="M58.8774 74.552H25.5193C25.0458 74.552 24.5916 74.3639 24.2568 74.0291C23.922 73.6943 23.7339 73.2401 23.7339 72.7666C23.7339 72.2931 23.922 71.839 24.2568 71.5041C24.5916 71.1693 25.0458 70.9812 25.5193 70.9812H58.8774C59.3509 70.9812 59.805 71.1693 60.1399 71.5041C60.4747 71.839 60.6628 72.2931 60.6628 72.7666C60.6628 73.2401 60.4747 73.6943 60.1399 74.0291C59.805 74.3639 59.3509 74.552 58.8774 74.552Z"
                fill="#002266"
            />
            <path
                d="M63.3409 85.3001H25.5193C25.0458 85.3001 24.5916 85.112 24.2568 84.7771C23.922 84.4423 23.7339 83.9882 23.7339 83.5147C23.7339 83.0411 23.922 82.587 24.2568 82.2522C24.5916 81.9174 25.0458 81.7292 25.5193 81.7292H63.3409C63.8144 81.7292 64.2686 81.9174 64.6034 82.2522C64.9382 82.587 65.1263 83.0411 65.1263 83.5147C65.1263 83.9882 64.9382 84.4423 64.6034 84.7771C64.2686 85.112 63.8144 85.3001 63.3409 85.3001Z"
                fill="#002266"
            />
            <path
                d="M67.8044 96.0459H25.5193C25.0458 96.0459 24.5916 95.8578 24.2568 95.523C23.922 95.1882 23.7339 94.734 23.7339 94.2605C23.7339 93.787 23.922 93.3329 24.2568 92.998C24.5916 92.6632 25.0458 92.4751 25.5193 92.4751H67.8044C68.278 92.4751 68.7321 92.6632 69.0669 92.998C69.4017 93.3329 69.5898 93.787 69.5898 94.2605C69.5898 94.734 69.4017 95.1882 69.0669 95.523C68.7321 95.8578 68.278 96.0459 67.8044 96.0459Z"
                fill="#002266"
            />
            <path
                d="M67.5456 17.7983C67.0721 17.7983 66.6179 17.6102 66.2831 17.2753C65.9483 16.9405 65.7602 16.4864 65.7602 16.0129V3.57082H18.3464C17.8729 3.57082 17.4188 3.38271 17.084 3.04788C16.7491 2.71305 16.561 2.25893 16.561 1.78541C16.561 1.31189 16.7491 0.857763 17.084 0.522934C17.4188 0.188105 17.8729 0 18.3464 0H67.5456C68.0191 0 68.4732 0.188105 68.8081 0.522934C69.1429 0.857763 69.331 1.31189 69.331 1.78541V16.0129C69.331 16.4864 69.1429 16.9405 68.8081 17.2753C68.4732 17.6102 68.0191 17.7983 67.5456 17.7983Z"
                fill="#002266"
            />
            <path
                d="M16.0143 89.7725H1.78687C1.31335 89.7725 0.859226 89.5844 0.524397 89.2496C0.189568 88.9148 0.00146484 88.4606 0.00146484 87.9871V18.3562C0.00146484 17.8827 0.189568 17.4286 0.524397 17.0937C0.859226 16.7589 1.31335 16.5708 1.78687 16.5708C2.26039 16.5708 2.71452 16.7589 3.04935 17.0937C3.38417 17.4286 3.57228 17.8827 3.57228 18.3562V86.2017H16.0143C16.4879 86.2017 16.942 86.3898 17.2768 86.7246C17.6116 87.0595 17.7997 87.5136 17.7997 87.9871C17.7997 88.4606 17.6116 88.9148 17.2768 89.2496C16.942 89.5844 16.4879 89.7725 16.0143 89.7725Z"
                fill="#002266"
            />
            <path
                d="M18.3465 20.1326H1.78681C1.43349 20.1329 1.08803 20.0283 0.794158 19.8322C0.500291 19.636 0.271235 19.3571 0.135986 19.0306C0.00073647 18.7042 -0.0346229 18.345 0.0343839 17.9985C0.103391 17.652 0.27366 17.3337 0.523637 17.084L17.0833 0.52437C17.3329 0.274527 17.6509 0.104303 17.9972 0.0352252C18.3435 -0.0338525 18.7026 0.001319 19.0289 0.136291C19.3552 0.271264 19.6342 0.499974 19.8305 0.793499C20.0268 1.08702 20.1317 1.43218 20.1319 1.78531V18.345C20.1322 18.5796 20.0862 18.812 19.9966 19.0289C19.907 19.2458 19.7756 19.4429 19.6097 19.6089C19.4439 19.7749 19.247 19.9066 19.0302 19.9965C18.8135 20.0864 18.5811 20.1326 18.3465 20.1326ZM6.09634 16.5618H16.5611V6.09707L6.09634 16.5618Z"
                fill="#002266"
            />
        </svg>
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
