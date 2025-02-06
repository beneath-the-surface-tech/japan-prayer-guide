import React from "react"
import { Container, Card, Image } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import { TFunction, Trans, useTranslation } from "next-i18next"
import { useRouter } from "next/router"

export enum PrayerDisplayStyle {
    Featured,
    TopicTop,
    TopicBottom,
}

interface prayerProps {
    topicTrans: TFunction // the translation object for the given topic
    displayStyle: PrayerDisplayStyle
}

export default function PrayerPoints({ topicTrans, displayStyle }: prayerProps) {
    const { t, i18n } = useTranslation("common")
    const router = useRouter()

    const prayerPoints: string = topicTrans("prayerSummary")
    const featuredImg: string = topicTrans("heroPhoto") as string
    const featuredTopicUrl: string = topicTrans("path", "all")

    let alignLeft: boolean = false
    let showTitle: boolean = false
    let showImg: boolean = false
    let buttonPrompts: boolean = false
    let style: string = ""

    switch (displayStyle) {
        case PrayerDisplayStyle.Featured:
            showTitle = true
            showImg = true
            buttonPrompts = true
            style = "featured"
            break
        case PrayerDisplayStyle.TopicTop:
            alignLeft = true
            style = "topicTop"
            break
        case PrayerDisplayStyle.TopicBottom:
            showTitle = true
            style = "topicBottom"
            break
    }

    return (
        <Container
            data-testid={"prayer-points-container"}
            className={"d-flex px-6" + (alignLeft ? " justify-content-start" : " justify-content-center")}
            id={displayStyle == PrayerDisplayStyle.TopicBottom ? "prayer" : "topic-prayer-" + style}
        >
            <Card
                className={
                    "shadow d-md-flex flex-md-row" +
                    (displayStyle === PrayerDisplayStyle.TopicBottom ? " mb-4" : " my-4") +
                    " prayer-points-card"
                }
            >
                {showImg && <Card.Img variant="top" src={featuredImg} className="prayer-img" />}
                <Card.Body data-testid="prayer-points-body" className={style}>
                    {showTitle && (
                        <Card.Text
                            data-testid={"prayer-points-title"}
                            className="px-2 pb-2 fs-2 border-bottom border-grey prayer-title"
                        >
                            <Trans t={topicTrans} i18nKey="title" />
                        </Card.Text>
                    )}
                    <Card.Text className="fs-3 prayerSubtitle d-flex align-items-center gap-2 text-secondary-5">
                        <Image alt="praying hands" src="/icons/prayer.png" style={{ height: "20px" }} />
                        <Trans t={t} i18nKey="prayerSummary.subtitle" />
                    </Card.Text>

                    <div
                        className="bullet-points-wrapper"
                        dangerouslySetInnerHTML={{ __html: prayerPoints }}
                        data-testid={"prayer-points-points"}
                    />

                    {buttonPrompts && (
                        <>
                            <Button
                                className="feature-button fs-4 fw-bold bg-white text-secondary-5 text-center border-secondary-5 mt-3 mb-2"
                                variant="primary"
                                onClick={() =>
                                    router.push(featuredTopicUrl, featuredTopicUrl, { locale: i18n.language })
                                }
                            >
                                <Trans t={t} i18nKey="prayerSummary.readMore" />
                            </Button>
                            <Card.Text
                                className="mt-3 w-100 mx-auto text-center text-decoration-underline text-secondary-5 fw-bold fs-4 feature-view-all"
                                style={{ cursor: "pointer" }}
                                onClick={() => router.push("topics/all", "topics/all", { locale: i18n.language })}
                                tabIndex={0}
                            >
                                <Trans t={t} i18nKey="prayerSummary.viewAll" />
                            </Card.Text>
                        </>
                    )}
                </Card.Body>
            </Card>
        </Container>
    )
}
