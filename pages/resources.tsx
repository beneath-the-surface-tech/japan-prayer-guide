import Head from "next/head"
import React from "react"
import { ToggleHeader } from "../components/ToggleHeader"
import { Button, Container, Image } from "react-bootstrap"
import { Trans, useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Footer from "../components/Footer"
import Link from "next/link"

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["resources", "common"])),
            // Will be passed to the page component as props
            // About used in content, common used in header
        },
    }
}

const Downloads: React.FC = () => {
    const { t } = useTranslation("resources")
    const webpageTitle = t("webpageTitle", "Resources")

    return (
        <div>
            <Head>
                <title>{webpageTitle}</title>
                <meta name="description" content="Japan prayer guide" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content={webpageTitle} />
                <meta property="og:description" content="30 ways to pray for Japan" />
                <meta property="og:type" content="website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main id="about" role="main">
                <ToggleHeader />

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

                <Footer />
            </main>
        </div>
    )
}

export default Downloads
