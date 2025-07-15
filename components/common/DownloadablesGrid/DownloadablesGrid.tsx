import React, { ReactNode } from "react"
import { Card } from "react-bootstrap"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Link from "next/link"
import { Trans, useTranslation } from "next-i18next"
import { RiDonutChartFill, RiFile3Line, RiImageFill, RiSlideshowLine } from "react-icons/ri"

interface downloadProps {
    className?: string
    infographicsUrl?: string
    photographyUrl?: string
    pdfUrl?: string
    slidesUrl?: string
    rowCount?: number
    smRowCount?: number
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
        <Col key={label} className="resource-card">
            <Link
                href={disabled ? "#" : link}
                className={"text-decoration-none"}
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : undefined}
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

export default function DownloadablesGrid({
    className,
    infographicsUrl = "",
    photographyUrl = "",
    pdfUrl = "",
    slidesUrl = "",
    rowCount = 1,
    smRowCount = 2,
}: downloadProps) {
    const { t } = useTranslation("common")

    const infographicsLabel = t("downloads.infographicsLabel")
    const photographyLabel = t("downloads.photographyLabel")
    const pdfLabel = t("downloads.pdfLabel")
    const slidesLabel = t("downloads.slidesLabel")

    return (
        <Row
            md={rowCount}
            sm={smRowCount}
            className={"grid-row g-3 d-md-flex d-block " + className}
            data-testid={"topic-downloadables-links"}
        >
            <ResourceCard
                icon={<RiDonutChartFill />}
                label={infographicsLabel}
                link={infographicsUrl}
                disabled={infographicsUrl === ""}
            />
            <ResourceCard icon={<RiFile3Line />} label={pdfLabel} link={pdfUrl} disabled={pdfUrl === ""} />
            <ResourceCard
                icon={<RiImageFill />}
                label={photographyLabel}
                link={photographyUrl}
                disabled={photographyUrl === ""}
            />
            <ResourceCard
                icon={<RiSlideshowLine />}
                label={slidesLabel}
                link={slidesUrl}
                disabled={slidesUrl === ""}
                shrinkWidth={true}
            />
        </Row>
    )
}
