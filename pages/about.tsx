import React from "react"
import { ToggleHeader } from "../components/ToggleHeader"
import { Container } from "react-bootstrap"
import { useTranslation, Trans } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Footer from "../components/Footer"
import Link from "next/link"
import { LowHighImage } from "../components/LowHighImage"
import Image from "next/image"
import bannerHeroHighRes from "../public/photos/about/about_hero.jpg"
import bannerHeroLowRes from "../public/photos/about/about_hero_LowRes.jpg"
import about1 from "../public/photos/about/about_01.png"
import about2 from "../public/photos/about/about_02.png"
import about3 from "../public/photos/about/about_03.png"
import omfLogo from "../public/photos/about/about_omf.png"
import pioneersLogo from "../public/photos/about/about_pioneers.png"
import NextImage from "../components/common/NextImage/NextImage"
import nextI18nextConfig from "../next-i18next.config"
import AppHeader from "../components/common/AppHeader"

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["about", "common"], nextI18nextConfig)),
            // Will be passed to the page component as props
            // About used in content, common used in header
        },
    }
}

const About: React.FC = () => {
    const { t } = useTranslation("about")

    const webpageTitle = t("webpageTitle", "About") as string
    const introBlurb: string[] = t("introBlurb", { returnObjects: true }) as string[]
    const contextBlurb: string[] = t("contextBlurb", { returnObjects: true }) as string[]

    return (
        <div>
            <AppHeader
                title={webpageTitle}
                description="Japan prayer guide"
                pageType="website"
                image={bannerHeroHighRes.src}
            />
            <main id="about" role="main">
                <ToggleHeader />

                {/* Hero Section */}
                <div
                    id="about-landing-image"
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
                    <h2 className="px-4 px-md-5 px-lg-4 text-white w-100">
                        <Trans t={t} i18nKey="heroSubheader" />
                    </h2>
                    <h1 className="px-4 px-md-5 px-lg-4 text-white w-100" style={{ whiteSpace: "pre-line" }}>
                        <Trans t={t} i18nKey="heroHeader" />
                    </h1>
                </div>

                {/* Growing interest section */}
                <Container id="who-are-we" className="w-100 d-flex flex-column align-items-center px-4 px-md-4">
                    <h1 className="text-primary about-h1-header text-center">
                        <Trans t={t} i18nKey="introTitle" />
                    </h1>
                    <NextImage className="about-main-image mt-4" alt="about img 1" src={about1} />

                    <Container className="px-0">
                        <div className="w-100 mt-4 pt-3"></div>
                        {introBlurb.map((text, idx) => (
                            <p key={idx + text} className="common-p about-body-text">
                                <Trans>{text}</Trans>
                            </p>
                        ))}
                    </Container>
                </Container>

                {/* Beneath section */}
                <div className="bg-secondary-2 w-100 pb-4 pb-md-5 pt-5 d-flex align-items-center flex-column px-4 px-md-4">
                    <Container className="about-beneath-surface align-items-center">
                        <h1 className="mt-2 mb-4 pb-2 text-primary about-h1-header text-center">
                            <Trans t={t} i18nKey="contextTitle" />
                        </h1>
                        <Container className="d-flex flex-column flex-md-row gap-3 gap-xl-4 about-images justify-content-center px-0">
                            <NextImage className="about-image" src={about2} alt="about img 2" />
                            <NextImage className="about-image" src={about3} alt="about img 3" />
                        </Container>
                        <div className="w-100 mt-4 pt-3"></div>
                        <Container className="about-beneath-surface-text">
                            {contextBlurb.map((text, idx) => (
                                <p key={"context-blurb-" + idx} className="common-p about-body-text">
                                    <Trans>{text}</Trans>
                                </p>
                            ))}
                        </Container>
                    </Container>
                </div>

                {/* Verse section */}
                <div className="w-100 py-5 px-4 bg-grey-7">
                    <Container className="w-100 about-verse">
                        <h2 className="common-p text-white text-center fst-italic mt-3">
                            <Trans t={t} i18nKey="bible.content" />
                        </h2>
                        <h3 className="text-white text-center about-passage-location mt-4 mb-2">
                            <Trans t={t} i18nKey="bible.passageLocation" />
                        </h3>
                    </Container>
                </div>

                {/* Invitation to prayer */}
                <Container className="w-100 about-invite px-4">
                    <div className="d-flex mt-2 flex-column align-items-center border-grey-4 border-bottom">
                        <h1 className="mt-5 about-h1-header text-black text-center">
                            <Trans t={t} i18nKey="inviteTitle" />
                        </h1>
                        <Container className="px-0">
                            <p className="mt-4 mb-5 common-p about-body-text">
                                <Trans t={t} i18nKey="inviteBlurb" />{" "}
                                <strong>
                                    <Trans t={t} i18nKey="callToAction" />
                                </strong>
                            </p>
                        </Container>
                    </div>
                </Container>

                {/* Logos */}
                <Container className="about-logos-container w-100 d-flex justify-content-center align-items-center my-5">
                    <div className="ms-2">
                        <Link href="https://omf.org/east-asia/japan/">
                            <Image className="omf-logo" alt="omf logo" src={omfLogo} />
                        </Link>
                    </div>
                    <div className="">
                        <Link href="https://www.pioneersjapan.org/">
                            <Image className="pioneers-logo" alt="omf logo" src={pioneersLogo} />
                        </Link>
                    </div>
                </Container>

                <Footer />
            </main>
        </div>
    )
}

export default About
