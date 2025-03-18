import React from "react"
import { Container } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Link from "next/link"
import { TFunction, Trans, useTranslation } from "next-i18next"
import DownloadablesGrid from "../../common/DownloadablesGrid/DownloadablesGrid"

interface downloadProps {
    topicTrans: TFunction
}

export default function TopicDownloadables({ topicTrans }: downloadProps) {
    const { t, i18n } = useTranslation("common")

    // defaults to "" if not available, this is checked for determining disabled status in ResourceCard
    const infographicsUrl = topicTrans("downloads.infographicsUrl", "")
    const photographyUrl = topicTrans("downloads.photographyUrl", "")
    const pdfUrl = topicTrans("downloads.pdfUrl", "")
    const prayerPtsUrl = topicTrans("downloads.prayerPtsUrl", "")
    const prayerVidUrl = topicTrans("downloads.prayerVidUrl", "")
    const slidesUrl = topicTrans("downloads.slidesUrl", "")
    const downloadAllUrl = topicTrans("downloads.downloadAllUrl", "#")

    return (
        <Container
            data-testid={"topic-downloadables-container"}
            className="d-flex flex-column my-3 my-md-4"
            id="topic-downloads"
        >
            <div className="my-md-2"></div>
            <Container className="mb-3 mb-md-0">
                <h2 data-testid={"topic-downloadables-title"} className="fw-bold text-primary mt-4 mb-3">
                    <Trans t={t} i18nKey="downloads.title" />
                </h2>
                <p>
                    <Trans t={t} i18nKey="downloads.description" />
                </p>
            </Container>
            <Container>
                <DownloadablesGrid
                    infographicsUrl={infographicsUrl}
                    photographyUrl={photographyUrl}
                    pdfUrl={pdfUrl}
                    prayerPtsUrl={prayerPtsUrl}
                    prayerVidUrl={prayerVidUrl}
                    slidesUrl={slidesUrl}
                />
            </Container>
            <Link
                href={downloadAllUrl}
                className="align-self-center w-100 mt-2 mt-md-3"
                style={{ maxWidth: "280px", cursor: "not-allowed" }}
                locale={i18n.language}
            >
                <Button
                    disabled
                    className="align-self-center w-100 mt-4 px-3 text-white bg-grey-4 border-secondary-5 fw-bold fs-4 border-0"
                    variant="primary"
                >
                    <Trans t={t} i18nKey="downloads.downloadAllBtn" />
                </Button>
            </Link>
            {/* <Link
                href={"/resources"}
                className="align-self-center my-3 text-secondary-5 fw-bolder fs-5"
                locale={i18n.language}
            >
                <Trans t={t} i18nKey="downloads.viewAllBtn" />
            </Link> */}
        </Container>
    )
}
