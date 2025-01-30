import { Trans, useTranslation } from "next-i18next"
import { Cross, Info } from "../../icons"
import { Backdrop, Box, Modal, Slide } from "@mui/material"
import { useState } from "react"

const style = {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "80vh",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    overflow: "auto",
}

export const ReferencesSection = ({ localeRef }: { localeRef: string }) => {
    const [open, setOpen] = useState(false)

    const { t: topic } = useTranslation(localeRef)
    const { t: topicCommon } = useTranslation("topic-pages")

    const linkLabel: string = topicCommon("references")
    const photoCredits: string[] = topic("photoCredits", { returnObjects: true })
    const articleReferences: any[] = topic("articleReferences", { returnObjects: true })
    const infographicReferences: any[] = topic("infographicReferences", { returnObjects: true })

    const hasArticle = articleReferences.length > 0
    const hasInfographic = infographicReferences.length > 0

    return (
        <div className="d-flex align-items-center gap-2 mt-4 mb-2">
            <Info />
            <a className="fw-bold text-secondary-5 cursor-pointer" onClick={() => setOpen(true)}>
                {linkLabel}
            </a>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Slide
                    direction="up"
                    in={open}
                    mountOnEnter
                    unmountOnExit
                    style={{ border: "none", borderRadius: "8px 8px 0px 0px" }}
                    className="references-modal"
                >
                    <Box sx={{ ...style, width: "100%" }}>
                        <div className="slideUp-container">
                            <div className="slideUp-header">
                                <span className="cursor-pointer" onClick={() => setOpen(false)}>
                                    <Cross />
                                </span>
                            </div>
                            <div className="slideUp-title">References used in this article</div>
                            <hr className="mt-3 mb-4" />
                            {/* Photo Credits */}
                            <div className="reference-header">{topicCommon("photoCredits")}</div>
                            <div className="reference-body mt-2">
                                {topicCommon("photosBy") + " "}
                                <a href="https://www.cherrinayoon.com">Cherrina Yoon</a>
                            </div>
                            {photoCredits.map((photo: string) => (
                                <div key={photo} className="reference-body mt-2">
                                    {photo}
                                </div>
                            ))}
                            {/* Article References */}
                            {hasArticle && (
                                <>
                                    <div className="reference-header mt-3">{topicCommon("articleReferences")}</div>
                                    <ol>
                                        {articleReferences.map((article) => (
                                            <li key={article.body} className="reference-body mt-2">
                                                <Trans>{article.body}</Trans> <a href={article.link}>{article.link}</a>
                                            </li>
                                        ))}
                                    </ol>
                                </>
                            )}
                            {/* Infographic References */}
                            {hasInfographic && (
                                <>
                                    <div className="reference-header mt-2">{topicCommon("infographicReferences")}</div>
                                    <div className="reference-body mt-2">
                                        <Trans>{topicCommon("infoDisclaimer")}</Trans>
                                    </div>
                                    {infographicReferences.map((info) => (
                                        <div key={info.body} className="reference-body mt-2 indented">
                                            <Trans>{info.body}</Trans> <a href={info.link}>{info.link}</a>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </Box>
                </Slide>
            </Modal>
        </div>
    )
}
