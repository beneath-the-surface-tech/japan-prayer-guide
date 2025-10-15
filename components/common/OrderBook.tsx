import Link from "next/link"
import { Container } from "react-bootstrap"
import { Trans, useTranslation } from "next-i18next"
import { IconContext } from "react-icons"
import { RiInformationLine } from "react-icons/ri"
import { OrderRegionType } from "../../pages"
import { MenuItem, Select } from "@mui/material"
import { useState } from "react"
import { FaChevronDown } from "react-icons/fa"

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
                            className={`fs-5 fw-bold bg-secondary-5 text-white text-center region text-decoration-none ${
                                region.url === "" && "disabled btn"
                            }`}
                            href={region.url}
                            key={region.text}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Trans>{region.text}</Trans>
                        </Link>
                    ))}
                </div>
                <Link
                    className="fs-4 text-secondary-5 fw-bold text-decoration-underline mb-4"
                    href="https://www.amazon.com/dp/B099KSSY79"
                    target="_blank"
                    rel="noopener noreferrer"
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
                    target="_blank"
                    rel="noopener noreferrer"
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

export function OrderBookV2() {
    const { t, i18n } = useTranslation("common")
    const language = i18n.language
    const [dropdown, setDropdown] = useState(language)
    const [open, setOpen] = useState(false)

    const orderRegionsMap = t("order.regions", { returnObjects: true }) as OrderRegionType[]

    function ENSection() {
        return (
            <Container className="home-order-section bg-grey-1 d-flex flex-column align-items-center px-4">
                <h2 className="text-primary fs-4 fw-bold mb-2 mt-4">
                    <Trans t={t} i18nKey="order.blurb" />
                </h2>
                <div className="d-flex flex-column flex-md-row align-items-center gap-3 mb-2">
                    {orderRegionsMap.map((region) => (
                        <Link
                            className={`fs-5 fw-bold bg-secondary-5 text-white text-center region text-decoration-none ${
                                region.url === "" && "disabled btn"
                            }`}
                            href={region.url}
                            key={region.text}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Trans>{region.text}</Trans>
                        </Link>
                    ))}
                </div>
                <Link
                    className="fs-4 text-secondary-5 fw-bold text-decoration-underline mb-4"
                    href="https://www.amazon.com/dp/B099KSSY79"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Trans t={t} i18nKey="order.prompt" />
                </Link>
            </Container>
        )
    }

    function JASection() {
        return (
            <Container className="home-order-section bg-grey-1 d-flex flex-column align-items-center">
                <h2 className="text-black fs-5 mb-2 d-flex align-items-center gap-1 mt-4 mb-1">
                    <IconContext.Provider value={{ size: "16px" }}>
                        <RiInformationLine />
                    </IconContext.Provider>
                    <Trans t={t} i18nKey="order.warning" />
                </h2>
                <Link
                    className="fs-5 japan-order bg-grey-1 text-center text-secondary-5 border-secondary-5 fw-bold fs-5 mb-4 p-2 text-decoration-none border rounded"
                    href="https://docs.google.com/forms/d/e/1FAIpQLSf03r2GXDfFa17f5ICL_HTy_NuQOpaJcmNgRyFQN10ghgEYqQ/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Trans t={t} i18nKey="order.form" />
                </Link>
            </Container>
        )
    }

    function CHSection() {
        return (
            <Container className="home-order-section bg-grey-1 d-flex flex-column align-items-center">
                <Link
                    className="fs-5 japan-order bg-grey-1 text-center text-secondary-5 border-secondary-5 fw-bold fs-5 mb-4 mt-4 p-2 text-decoration-none border rounded"
                    href="https://omf.org/hk/book/s7b08/#"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Trans t={t} i18nKey="order.learnMoreAndOrder" />
                </Link>
            </Container>
        )
    }

    function NOSection() {
        return (
            <Container className="home-order-section bg-grey-1 d-flex flex-column align-items-center px-4">
                <Link
                    className="fs-5 japan-order bg-grey-1 text-center text-secondary-5 border-secondary-5 fw-bold fs-5 mb-1 mt-4 p-2 text-decoration-none border rounded"
                    href="https://frikirken.no/bonnekampanje-for-japan"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Trans t={t} i18nKey="order.learnMore" />
                </Link>
                <Link
                    className="fs-4 text-secondary-5 fw-bold text-decoration-underline mt-1 mb-1"
                    href="https://frikirken.no/site/frikirken.no/files/under-overflaten.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Trans t={t} i18nKey="order.downloadThePDF" />
                </Link>
                <h2 className="text-black fs-5 mb-2 d-flex align-items-center gap-1 mt-1 mb-4 font-italic">
                    <Trans t={t} i18nKey="order.norwegianBlurb" />
                </h2>
            </Container>
        )
    }

    function GASection() {
        return (
            <Container className="home-order-section bg-grey-1 d-flex flex-column align-items-center px-4">
                <Link
                    className="fs-5 japan-order bg-grey-1 text-center text-secondary-5 border-secondary-5 fw-bold fs-5 mb-1 mt-4 p-2 text-decoration-none border rounded"
                    href="https://omf.org/de/resource/japan-gebetsheft-hinter-den-kulissen/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Trans t={t} i18nKey="order.learnMoreAndOrder" />
                </Link>
                <Link
                    className="fs-4 text-secondary-5 fw-bold text-decoration-underline mt-1 mb-1"
                    href="https://omf.org/de/resource/japan-gebetsheft-hinter-den-kulissen/#:~:text=Read%20the%20magazine%20online"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Trans t={t} i18nKey="order.viewOnline" />
                </Link>
                <h2 className="text-black fs-5 mb-2 d-flex align-items-center gap-1 mt-1 mb-4 font-italic">
                    <Trans t={t} i18nKey="order.germanBlurb" />
                </h2>
            </Container>
        )
    }

    const renderOrder = () => {
        if (dropdown === "en") {
            return <>{ENSection()}</>
        } else if (dropdown === "jp") {
            return <>{JASection()}</>
        } else if (dropdown === "ch") {
            return <>{CHSection()}</>
        } else if (dropdown === "no") {
            return <>{NOSection()}</>
        } else if (dropdown === "ga") {
            return <>{GASection()}</>
        }
    }

    const Icon = () => {
        return (
            <div style={{ marginRight: "12px", transform: open ? "rotate(180deg)" : "" }}>
                <FaChevronDown />
            </div>
        )
    }

    return (
        <Container className="d-flex flex-column align-items-center w-100 mt-2 mb-5 no-max-container">
            <Container
                className={
                    "home-order-section bg-grey-2 d-flex flex-column align-items-center px-4" +
                    (language === "en" ? "" : " mt-4")
                }
            >
                <svg
                    style={{ height: "44px", width: "32px" }}
                    className="pt-3"
                    width="44"
                    height="32"
                    viewBox="0 0 44 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M11.9081 0C8.11034 0 4.39812 0.870958 1.21696 2.52144C1.20017 2.53141 1.18337 2.54138 1.16825 2.55302C1.12626 2.57629 1.08595 2.60288 1.04732 2.63113C1.0154 2.6544 0.986844 2.67767 0.958292 2.70261C0.928057 2.72754 0.901183 2.75413 0.874308 2.78072C0.825597 2.83059 0.781926 2.88377 0.741613 2.94029C0.736574 2.9486 0.729855 2.95691 0.724817 2.96522C0.577003 3.18461 0.499736 3.44225 0.501417 3.70653V30.568C0.496378 30.6777 0.504777 30.7891 0.526613 30.8971C0.528293 30.9021 0.528293 30.9071 0.529972 30.9121C0.546769 30.9902 0.568605 31.065 0.598841 31.1381C0.602201 31.1481 0.60724 31.1564 0.612279 31.1647C0.624037 31.1979 0.635795 31.2295 0.650912 31.2611C0.671069 31.2943 0.691225 31.3259 0.714741 31.3575C0.72314 31.3708 0.731538 31.3841 0.739937 31.3991C0.77857 31.4522 0.820562 31.5038 0.865915 31.552C0.879352 31.5669 0.89447 31.5819 0.907908 31.5968C0.951579 31.6367 0.996931 31.6733 1.04564 31.7082C1.0658 31.7248 1.08763 31.7415 1.11115 31.7564C1.15818 31.7863 1.20857 31.8146 1.26064 31.8379C1.28248 31.8495 1.306 31.8628 1.32783 31.8744H1.33119C1.47732 31.9326 1.63186 31.9658 1.78975 31.9725C1.80822 31.9741 1.82502 31.9758 1.8435 31.9775C2.10385 31.9775 2.36083 31.9027 2.58086 31.7614C5.3171 30.3669 8.57424 29.6106 11.9098 29.6106C15.2574 29.6106 18.5245 30.3702 21.2658 31.773V31.7747C21.5597 31.9625 21.9158 32.0306 22.2601 31.9625C22.2618 31.9608 22.2635 31.9608 22.2652 31.9592C22.3425 31.9442 22.4197 31.9209 22.4936 31.891C22.5037 31.8877 22.5155 31.8827 22.5272 31.8794C22.5591 31.8661 22.591 31.8545 22.6213 31.8395C25.381 30.4068 28.6817 29.6223 32.0629 29.6223C35.4525 29.6223 38.7632 30.4118 41.5263 31.8495C41.9614 32.0739 42.4838 32.0456 42.8919 31.7764C42.8936 31.7764 42.8953 31.7747 42.897 31.7747L42.9171 31.7597C42.9743 31.7199 43.028 31.6766 43.0784 31.6284C43.1019 31.6052 43.1254 31.5802 43.1489 31.5536C43.1809 31.5187 43.2111 31.4822 43.2396 31.4439C43.2632 31.4107 43.285 31.3758 43.3052 31.3409C43.3169 31.3243 43.3287 31.306 43.3404 31.2894C43.3522 31.2644 43.3656 31.2395 43.3757 31.2129V31.2112C43.3875 31.188 43.3959 31.1647 43.4059 31.1414C43.4059 31.1398 43.4076 31.1398 43.4076 31.1381C43.4278 31.0849 43.4446 31.0317 43.458 30.9769C43.458 30.9736 43.4597 30.9686 43.4597 30.9636C43.4647 30.9436 43.4698 30.9237 43.4731 30.9038C43.4748 30.9004 43.4748 30.8971 43.4765 30.8938C43.4832 30.8489 43.4882 30.804 43.4899 30.7592C43.4933 30.7292 43.4983 30.6993 43.5 30.6711V3.72151C43.4983 3.69492 43.4966 3.66999 43.4933 3.64505C43.4899 3.59353 43.4832 3.542 43.4748 3.49048C43.4714 3.47552 43.4698 3.46056 43.4664 3.4456C43.4647 3.44228 43.4647 3.43895 43.463 3.43563C43.4496 3.36914 43.4295 3.30598 43.4059 3.24282C43.3959 3.22122 43.3875 3.20127 43.3774 3.17966C43.3488 3.11318 43.3136 3.05002 43.2749 2.98852C43.2732 2.98519 43.2716 2.98353 43.2699 2.98021L43.2615 2.9719C43.2161 2.90708 43.1674 2.84724 43.112 2.79073C43.1086 2.7874 43.1053 2.78408 43.1002 2.78076C43.0062 2.68435 42.8953 2.60457 42.776 2.54141C39.5896 0.882636 35.8706 0.0100181 32.063 0.0100181C28.5121 0.0100181 25.0333 0.771283 21.9966 2.22062C18.9547 0.764602 15.469 0 11.9081 0ZM11.9081 2.65938C15.0105 2.65938 18.0443 3.32257 20.6544 4.53759V28.5869C17.9484 27.5132 14.9551 26.9531 11.9081 26.9531C8.8729 26.9531 5.8898 27.5033 3.19068 28.5687V4.52444C5.79421 3.31776 8.81769 2.65938 11.9081 2.65938ZM32.0628 2.66936C35.1652 2.66936 38.1989 3.33254 40.809 4.54756V28.5969C38.103 27.5215 35.1098 26.9614 32.0628 26.9614C29.0276 26.9614 26.0445 27.5198 23.3453 28.5869V4.53458C25.9489 3.3279 28.9723 2.66936 32.0628 2.66936Z"
                        fill="black"
                    />
                </svg>
                <div className="position-relative w-100 d-flex align-items-center flex-column">
                    <h1 className="w-auto bg-grey-2 p-3 pt-0 text-grey-7 mt-0 mb-1 position-relative">
                        <Trans t={t} i18nKey="order.titleV2" />
                    </h1>
                    <div className="w-100 bg-grey-7 horizontal-bar position-relative"></div>
                </div>
                <h2 className="text-primary fs-4 fw-bold mb-2 mt-0">
                    <Trans t={t} i18nKey="order.blurbV2" />
                </h2>
                <Select
                    value={dropdown}
                    className="mb-4 bg-white choose-language"
                    onChange={(e) => setDropdown(e.target.value)}
                    IconComponent={Icon}
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                >
                    <MenuItem className="menu-items" value="en">
                        English
                    </MenuItem>
                    <MenuItem className="menu-items" value="jp">
                        Japanese
                    </MenuItem>
                    <MenuItem className="menu-items" value="ch">
                        Chinese (traditional)
                    </MenuItem>
                    <MenuItem className="menu-items" value="ga">
                        German
                    </MenuItem>
                    <MenuItem className="menu-items" value="no">
                        Norwegian
                    </MenuItem>
                </Select>
            </Container>
            {renderOrder()}
        </Container>
    )
}
