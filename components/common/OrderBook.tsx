import Link from "next/link"
import { Container } from "react-bootstrap"
import { Trans, useTranslation } from "next-i18next"
import { IconContext } from "react-icons"
import { RiInformationLine } from "react-icons/ri"
import { OrderRegionType } from "../../pages"

export default function OrderBook() {
    const { t, i18n } = useTranslation("common")
    const language = i18n.language

    const orderRegionsMap: OrderRegionType[] = t("order.regions", { returnObjects: true }) as OrderRegionType[]

    function ENSection() {
        return (
            <Container
                className={
                    "home-order-section bg-grey-2 d-flex flex-column align-items-center px-4" +
                    (language === "en" ? "" : " mt-4")
                }
            >
                {/* <Image alt="order-icon" src="/photos/home/hp_order_en.png" className="d-block d-md-none mt-3" /> */}
                <div className="position-relative w-100 d-flex align-items-center flex-column">
                    <h1 className="w-auto bg-grey-2 p-3 text-grey-7 mt-3 mb-1 position-relative">
                        <Trans t={t} i18nKey="order.title" />
                    </h1>
                    <div className="w-100 bg-grey-7 horizontal-bar position-relative"></div>
                </div>
                <h2 className="text-primary fs-4 fw-bold mb-2 mt-1">
                    <Trans t={t} i18nKey="order.blurb" />
                </h2>
                <div className="d-flex flex-column flex-md-row align-items-center gap-3 mb-2">
                    {orderRegionsMap.map((region) => (
                        <Link
                            className="fs-5 fw-bold bg-secondary-5 text-white text-center region text-decoration-none"
                            href={region.url}
                            key={region.text}
                        >
                            <Trans>{region.text}</Trans>
                        </Link>
                    ))}
                </div>
                <Link
                    className="fs-4 text-secondary-5 fw-bold text-decoration-underline mb-4"
                    href="https://www.amazon.com/dp/B099KSSY79"
                >
                    <Trans t={t} i18nKey="order.prompt" />
                </Link>
            </Container>
        )
    }

    function JASection() {
        return (
            <Container
                className={
                    "home-order-section bg-grey-2 d-flex flex-column align-items-center" +
                    (language !== "en" ? "" : " mt-4")
                }
            >
                {/* <Image alt="order-icon" src="/photos/home/hp_order_ja.png" className="d-block d-md-none mt-3" /> */}
                <div className="position-relative w-100 d-flex align-items-center flex-column">
                    <h1 className="w-auto bg-grey-2 p-3 text-grey-7 mt-3 mb-1 position-relative">
                        <Trans t={t} i18nKey="order.japan" />
                    </h1>
                    <div className="w-100 bg-grey-7 horizontal-bar position-relative"></div>
                </div>
                <Link
                    className="fs-5 japan-order bg-grey-2 text-center text-secondary-5 border-secondary-5 fw-bold fs-5 mb-1 p-2 text-decoration-none border rounded"
                    href="https://docs.google.com/forms/d/e/1FAIpQLSf03r2GXDfFa17f5ICL_HTy_NuQOpaJcmNgRyFQN10ghgEYqQ/viewform"
                >
                    <Trans t={t} i18nKey="order.form" />
                </Link>
                <h2 className="text-black fs-5 mb-2 d-flex align-items-center gap-1 mb-4">
                    <IconContext.Provider value={{ size: "16px" }}>
                        <RiInformationLine />
                    </IconContext.Provider>
                    <Trans t={t} i18nKey="order.warning" />
                </h2>
            </Container>
        )
    }

    return (
        <Container className="d-flex flex-column align-items-center w-100 mt-2 mb-5 no-max-container">
            {language === "en" ? (
                <>
                    {ENSection()}
                    {JASection()}
                </>
            ) : (
                <>
                    {JASection()}
                    {ENSection()}
                </>
            )}
        </Container>
    )
}
