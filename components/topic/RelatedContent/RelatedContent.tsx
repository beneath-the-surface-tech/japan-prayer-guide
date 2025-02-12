import Link from "next/link"
import React from "react"
import { Card, Container } from "react-bootstrap"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { TFunction, Trans, useTranslation } from "next-i18next"
import Image from "next/image"

interface relatedProps {
    topicTrans: TFunction
}

export default function RelatedContent({ topicTrans }: relatedProps) {
    const slider: any = React.useRef(null)
    const { t: common, i18n } = useTranslation("common")

    const responsive = [
        {
            breakpoint: 1280,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ]

    const topics = topicTrans("related.labels", { returnObjects: true }) as string[]
    const links = topicTrans("related.links", { returnObjects: true }) as string[]
    const thumbnails = topicTrans("related.thumbs", { returnObjects: true }) as string[]
    const isLive = topicTrans("related.isLive", { returnObjects: true }) as boolean[]

    const onClickPrev = () => {
        slider?.current?.slickPrev()
    }

    const onClickNext = () => {
        slider?.current?.slickNext()
    }

    return (
        <Container
            id="related-content-main"
            data-testid={"related-content-container"}
            className="d-flex flex-column my-3 my-md-4"
        >
            <Container className="d-flex flex-row gap-4 align-items-center">
                <h1 data-testid={"related-content-title"} className="text-primary my-4 fs-1 fw-bold">
                    <Trans t={common} i18nKey="relatedTopics.heading" />
                </h1>
                <Link href={"/topics/all"} className="text-secondary" locale={i18n.language}>
                    <Trans t={common} i18nKey="relatedTopics.viewAll" />
                </Link>
            </Container>
            <Slider
                dots={false}
                infinite={true}
                speed={500}
                slidesToShow={3}
                slidesToScroll={1}
                arrows={false}
                responsive={responsive}
                ref={slider}
            >
                {topics?.map((topic, idx) => (
                    <Link
                        key={idx + topic}
                        className="d-flex flex-column align-items-center text-decoration-none py-1 px-0"
                        locale={i18n.language}
                        href={isLive[idx] ? links[idx] : "#"}
                    >
                        <Card className={`related-topic-card ${isLive[idx] ? "" : "disabled"}`}>
                            <Card.Body className="m-0 p-0">
                                <Image
                                    src={thumbnails[idx]}
                                    alt={`${topic} thumbnail`}
                                    className="w-100 bg-secondary"
                                    height={210}
                                    width={363}
                                />
                            </Card.Body>
                            <Card.Body className="m-2 p-1">
                                <p>
                                    <Trans>{topic}</Trans>
                                </p>
                            </Card.Body>
                        </Card>
                    </Link>
                ))}
            </Slider>
            <div className="related-prev d-lg-none" onClick={onClickPrev}>
                <div className="related-prev-icon" />
            </div>
            <div className="related-next d-lg-none" onClick={onClickNext}>
                <div className="related-next-icon" />
            </div>
        </Container>
    )
}
