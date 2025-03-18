import Link from "next/link"
import { Card, Container, Row, Col, Image } from "react-bootstrap"
import { Trans, useTranslation } from "next-i18next"

export interface Topic {
    label: string
    link: string
    disabled?: boolean
    image?: string
}

interface TopicOverviewProps {
    title: string
    section: string
    topics: Topic[]
}

export const TopicOverviewSection = ({ title, section, topics }: TopicOverviewProps) => {
    const { i18n } = useTranslation("common")

    return (
        <section>
            <Container id={section} className="no-max-container mt-4 mt-md-4">
                <h1 className="topic-nav-section-title text-primary pt-4 px-1 px-md-2 mb-0">
                    <Trans>{title}</Trans>
                </h1>
            </Container>
            <Container className="bottom-grey-border px-4 pt-1 no-max-container pb-5">
                <Row xl={3} lg={3} md={2} sm={2} xs={2} className="d-flex">
                    {topics.map((topic, idx) => {
                        // assume disabled if not explicitly set to false
                        const isDisabled: boolean = !(topic.disabled === false)
                        return (
                            <Col key={topic.link + idx} className="d-flex justify-content-center px-0 px-sm-1 px-md-2">
                                <Link
                                    href={isDisabled ? "" : topic.link}
                                    className="text-decoration-none position-relative"
                                    locale={i18n.language}
                                >
                                    <Card className={"topic-nav-card mx-1 my-3" + (isDisabled ? " disabled" : "")}>
                                        <div
                                            className="position-relative"
                                            style={{
                                                width: "fit-content",
                                                height: "fit-content",
                                                borderRadius: "8px 8px 0px 0px",
                                            }}
                                        >
                                            <Image
                                                src={
                                                    !isDisabled
                                                        ? topic.image
                                                        : `/photos/topic-nav/${section}/placeholder.png`
                                                }
                                                alt={""}
                                                className="placeholder-nav-img"
                                            />
                                            {isDisabled && (
                                                <div className="disabled-layer position-absolute w-100 h-100 opacity-75" />
                                            )}
                                        </div>
                                        <Card.Body className="d-flex topic-nav-card-title p-0">
                                            <p className={"m-0 " + (!isDisabled ? "" : "text-grey-6")}>
                                                <Trans>{topic.label}</Trans>
                                            </p>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </section>
    )
}
