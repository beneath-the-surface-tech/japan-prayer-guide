import Head from "next/head"
import { ToggleHeader } from "../../../components/ToggleHeader"
import { Trans, useTranslation } from "next-i18next"
import { Container } from "react-bootstrap"
import React from "react"
import Footer from "../../../components/Footer"
import { Topic, TopicOverviewSection } from "../../../components/topic-overview/TopicOverviewSection"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { StickyNav } from "../../../components/topic/StickyNav/StickyNav"
import { LowHighImage } from "../../../components/LowHighImage"
import bannerHeroHighRes from "../../../public/photos/topic-nav/TOPNAV_HERO.jpg"
import bannerHeroLowRes from "../../../public/photos/topic-nav/TOPNAV_HERO_LowRes.jpg"

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["topic-overview", "common"])),
            // Will be passed to the page component as props
            // About used in content, common used in header
        },
    }
}

export default function Overview() {
    const { t } = useTranslation("topic-overview")

    let cultureTopics: Topic[] = t("cultureTopics", { returnObjects: true })
    let churchTopics: Topic[] = t("churchTopics", { returnObjects: true })
    cultureTopics = Array.isArray(cultureTopics) ? cultureTopics : []
    churchTopics = Array.isArray(churchTopics) ? churchTopics : []

    const webpageTitle = t("webpageTitle", "Topic Overview")
    const cultureHeading = t("cultureHeading")
    const churchHeading = t("churchHeading")
    const navTabs = [
        { refId: "culture", label: cultureHeading },
        { refId: "church", label: churchHeading },
    ]

    const heroSubtext: string[] = t("pageSubtitle", { returnObjects: true })

    return (
        <>
            <Head>
                <title>{webpageTitle}</title>
                <meta name="description" content="Japan prayer guide" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content={webpageTitle} />
                <meta property="og:description" content="30 ways to pray for Japan" />
                <meta property="og:image" content={bannerHeroLowRes.src} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main role="main">
                {/* Header component */}
                <ToggleHeader hideShadow={true} />

                {/* Hero Banner */}
                <div
                    className="w-100 mx-0 px-0 position-relative d-flex flex-column align-items-center justify-content-center"
                    style={{ height: "490px", marginTop: "60px" }}
                >
                    <LowHighImage
                        src={bannerHeroLowRes}
                        highSrc={bannerHeroHighRes}
                        alt={"Topic-nav hero image"}
                        className="w-100 h-100 topic-nav-hero position-absolute"
                        isMainImage={true}
                    />
                    <Container className="d-flex flex-column align-items-center justify-content-center h-100 topics-header-container">
                        <h1 className="text-black px-3 pb-2 topic-nav-hero-title">
                            <Trans t={t} i18nKey="heading" />
                        </h1>
                        {heroSubtext.map((text) => (
                            <p
                                key={text}
                                style={{ whiteSpace: "pre-line" }}
                                className="text-black text-center topic-nav-hero-subtitle coming-soon"
                            >
                                <Trans>{text}</Trans>
                            </p>
                        ))}
                    </Container>
                </div>

                {/* Overview Nav Component */}
                <StickyNav tabs={navTabs} />

                {/* Culture and Society Section */}
                <TopicOverviewSection title={cultureHeading} section={"culture"} topics={cultureTopics} />

                {/* Church and Missions Section */}
                <TopicOverviewSection title={churchHeading} section={"church"} topics={churchTopics} />

                <Footer />
            </main>
        </>
    )
}
