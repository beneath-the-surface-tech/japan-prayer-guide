import React from "react"
import { Container } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Link from "next/link"
import { TFunction, Trans, useTranslation } from "next-i18next"
import DownloadablesGrid from "components/common/DownloadablesGrid/DownloadablesGrid"

interface downloadProps {
    topicTrans: TFunction
}

export default function TopicDownloadables({ topicTrans }: downloadProps) {
    const { t, i18n } = useTranslation("common")

    // defaults to "" if not available, this is checked for use in ResourceCard
    const infographicsUrl = topicTrans("downloads.infographicsUrl", "")
    const photographyUrl = topicTrans("downloads.photographyUrl", "")
    const pdfUrl = topicTrans("downloads.pdfUrl", "")
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
                    slidesUrl={slidesUrl}
                    rowCount={4}
                    smRowCount={1}
                />
            </Container>
            <Link
                href={downloadAllUrl}
                className="align-self-center w-100 mt-2 mt-md-3"
                style={{ maxWidth: "280px" }}
                locale={i18n.language}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Button
                    className="align-self-center w-100 mt-4 px-3 text-white bg-secondary-5 border-secondary-5 fw-bold fs-4 border-0"
                    variant="primary"
                >
                    <Trans t={t} i18nKey="downloads.downloadAllBtn" />
                </Button>
            </Link>
        </Container>
    )
}
