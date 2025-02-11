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

const DUMMY_DATA: any = {
    photoCredits: ["Photos by Thomas Bak, used with permission."],
    articleReferences: [
        {
            body: "Tomoe Ishikawa, “1.46 million social recluses in Japan, or 1 in 50 of the population,” The Asahi Shimbun,  1 April  2023, ",
            link: "https://bit.ly/40FY2dB",
        },
        {
            body: "“Child suicides in Japan hit record high of 514 in 2022,” <i>Kyodo News</i>, 14 March 2023,  ",
            link: "https://bit.ly/41O1rFg",
        },
        {
            body: "Ministry of Health, Labour and Welfare, 令和5年（2023）人口動態統計月報年計（概数）の概況 [<i>2023 Annual Report on Population Demographics (Estimate)</i>], June 2024, table 7 (36), ",
            link: "https://bit.ly/3W7BqA4",
        },
    ],
    infographicReferences: [
        {
            body: "Ministry of Health, Labour and Welfare, 令和6年版厚生労働白書（令和5年度厚生労働行政年次報告）こころの健康と向き合い、健やかに暮らすことのできる社会に [<i>2024 White Paper (2023 Fiscal Year Annual Report): Addressing mental health, toward a society of healthy lifestyles</i>], 60-65, 93-171, 172-173, fig. 1-4-4 (84), fig. 1-4-5 (85), fig. 1-4-12 (91), fig. 1-4-13 (92), ",
            link: "https://bit.ly/40xEbgX",
        },
        {
            body: "Tomoe Ishikawa, “1.46 million social recluses in Japan, or 1 in 50 of the population,” <i>The Asahi Shimbun</i>, 1 April  2023, ",
            link: "https://bit.ly/40FY2dB",
        },
        {
            body: "Ministry of Health, Labour and Welfare, 令和5年版厚生労働白書（令和4年度厚生労働行政年次報告）「つながり・支え合いのある地域共生社会」 [<i>2023 White Paper (2022 Fiscal Year Annual Report): A society of interconnected and supportive communities</i>], fig. 2-2-1 (59), fig. 2-2-2 (60), fig. 2-2-6 (63),",
            link: "https://bit.ly/3zhQZwv",
        },
        {
            body: "Ministry of Health, Labour and Welfare, 令和5年版厚生労働白書（令和4年度厚生労働行政年次報告）「つながり・支え合いのある地域共生社会」 [<i>2023 White Paper (2022 Fiscal Year Annual Report): A society of interconnected and supportive communities</i>], fig. 2-2-1 (59), fig. 2-2-2 (60), fig. 2-2-6 (63),",
            link: "https://bit.ly/4b7nivi",
        },
        {
            body: "Ministry of Health, Labour and Welfare, 令和5年（2023）人口動態統計月報年計（概数）の概況 [<i>2023 Annual Report on Population Demographics (Estimate)</i>], June 2024, table 6-1 (9), table 7 (36), ",
            link: "https://bit.ly/3W7BqA4v",
        },
    ],
}

export const ReferencesSection = ({ localeRef }: { localeRef: string }) => {
    const [open, setOpen] = useState(false)

    const { t: topic } = useTranslation(localeRef)
    const { t: topicCommon } = useTranslation("topic-pages")

    const linkLabel: string = topicCommon("references")
    // const photoCredits = topic("photoCredits", { returnObjects: true }) as string[]
    // const articleReferences = topic("articleReferences", { returnObjects: true }) as any[]
    // const infographicReferences = topic("infographicReferences", { returnObjects: true }) as any[]
    const hello = topic("")
    console.log(hello)
    const photoCredits = DUMMY_DATA.photoCredits
    const articleReferences = DUMMY_DATA.articleReferences
    const infographicReferences = DUMMY_DATA.infographicReferences

    const hasArticle = articleReferences.length > 0
    const hasInfographic = infographicReferences.length > 0

    const photoCreditsLabel =
        topicCommon("photoCredits") !== "photoCredits" ? topicCommon("photoCredits") : "Photo credits"
    const photosByLabel = topicCommon("photosBy") !== "photosBy" ? topicCommon("photosBy") : "Photos by"
    const articleReferencesLabel =
        topicCommon("articleReferences") !== "articleReferences"
            ? topicCommon("articleReferences")
            : "Article references"
    const infoReferencesLabel =
        topicCommon("infographicReferences") !== "infographicReferences"
            ? topicCommon("infographicReferences")
            : "Infographic references"
    const infoDisclaimerLabel =
        topicCommon("infoDisclaimer") !== "infoDisclaimer"
            ? topicCommon("infoDisclaimer")
            : "<i>Listed in order of initial appearance on the infographic</i>"

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
                            <div className="reference-header">{photoCreditsLabel}</div>
                            <div className="reference-body mt-2">
                                {photosByLabel + " "}
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
                                    <div className="reference-header mt-3">{articleReferencesLabel}</div>
                                    <ol>
                                        {articleReferences.map((article: any) => (
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
                                    <div className="reference-header mt-2">{infoReferencesLabel}</div>
                                    <div className="reference-body mt-2">
                                        <Trans>{infoDisclaimerLabel}</Trans>
                                    </div>
                                    {infographicReferences.map((info: any) => (
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
