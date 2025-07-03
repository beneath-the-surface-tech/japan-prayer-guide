import React, { ReactNode } from "react"
import { Container, Card } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Link from "next/link"
import { TFunction, Trans, useTranslation } from "next-i18next"
import { RiDonutChartFill, RiFile3Line, RiImageFill, RiSlideshowLine } from "react-icons/ri"

interface downloadProps {
    topicTrans: TFunction
}

interface ResourceProps {
    disabled?: boolean
    icon: ReactNode
    label: string
    link: string
    shrinkWidth?: boolean
}

const ResourceCard = ({ icon, label, link, disabled = false, shrinkWidth = false }: ResourceProps) => {
    return (
        <Col key={label}>
            <Link
                href={disabled ? "#" : link}
                className={"text-decoration-none"}
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : undefined}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Card
                    className={"resource-card shadow-sm border-0 rounded" + (disabled ? " disabled" : "")}
                    onClick={(event) => (disabled ? event.preventDefault() : null)}
                >
                    <Card.Body
                        data-testid="topic-downloadables-cards"
                        className={
                            "d-flex align-items-center justify-content-center topic-downloadables" +
                            (disabled ? " disabled" : "")
                        }
                    >
                        {icon}
                        <p className={"fw-bold my-0" + (shrinkWidth ? " shrinkWidth" : "")}>
                            <Trans>{label}</Trans>
                        </p>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    )
}

export default function TopicDownloadables({ topicTrans }: downloadProps) {
    const { t, i18n } = useTranslation("common")

    const infographicsLabel = t("downloads.infographicsLabel")
    const photographyLabel = t("downloads.photographyLabel")
    const pdfLabel = t("downloads.pdfLabel")
    const slidesLabel = t("downloads.slidesLabel")

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
