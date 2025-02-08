import React from "react"
import Image from "next/image"
import { Container, Nav, Navbar, NavDropdown, Row } from "react-bootstrap"
import { useState, useEffect } from "react"
import { TFunction, Trans, useTranslation } from "next-i18next"
import LanguageSwitcher from "./LanguageSwitcher"
import { useRouter } from "next/router"
import Link from "next/link"

const NavLinkWithLocale = ({
    trans,
    textKey,
    href,
    locale,
    current,
}: {
    trans: TFunction
    textKey: string
    href: string
    locale: string
    current: string
}) => {
    return (
        <Nav.Item>
            <Link href={href} passHref locale={locale} className={"nav-link"} tabIndex={0}>
                <Nav.Link as="span" className={current === href ? "selected-nav-link" : ""}>
                    <Trans t={trans} i18nKey={textKey} />
                </Nav.Link>
            </Link>
        </Nav.Item>
    )
}

const mediaQuery = "(min-width: 1280px)"

interface HeaderProp {
    hideShadow?: boolean
}

const ToggleHeader: React.FC<HeaderProp> = ({ hideShadow = false }: HeaderProp) => {
    const { t } = useTranslation("common") // specify translation file from public/locales/[lng]
    const { i18n } = useTranslation()
    const router = useRouter()

    const handleLanguageChange = (language: string) => {
        i18n.changeLanguage(language)
        const path = router.asPath
        const options = {
            locale: language,
        }

        router.push(path, path, options)
    }

    // when the Navbar.Collapse is expanded we want to switch to the dark theme
    const [bg, setBg] = useState("white")
    const [variant, setVariant] = useState("light")

    const toggleColorScheme = () => {
        setBg(bg === "white" ? "primary" : "white")
        setVariant(variant === "light" ? "dark" : "light")
    }

    // Without this useEffect, when you're in tablet/mobile width and the menu
    // is opened, if you expand the screen to become a desktop width, the color
    // scheme will not change accordingly.
    useEffect(() => {
        const mediaQueryList = window.matchMedia(mediaQuery)
        function update(e: MediaQueryListEvent) {
            if (e.matches) {
                setBg("white")
                setVariant("light")
            } else {
                if (document.getElementById("header-navbar-nav")?.classList.contains("show")) {
                    setBg("primary")
                    setVariant("dark")
                }
            }
        }

        mediaQueryList.addEventListener("change", update)
        return () => {
            // This is called the cleanup phase aka beforeUnmount
            mediaQueryList.removeEventListener("change", update)
        }
    }, []) // Only do this once, aka hook-ish way of saying didMount

    return (
        <Navbar
            className={hideShadow ? "" : "shadow-sm"}
            fixed="top"
            bg={bg}
            expand="xl"
            variant={variant}
            role="navigation"
        >
            <Container>
                <Navbar.Brand href={"/" + i18n.language}>
                    <Image
                        alt={t("header.brandAlt")}
                        src={
                            bg === "white"
                                ? `/bts-crane-wht-logo-${i18n.language}.png`
                                : `/bts-crane-blue-logo-${i18n.language}.png`
                        }
                        width="2136"
                        height="384"
                        className="d-inline-block align-top header-crane-button"
                    />{" "}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="header-navbar-nav" onClick={toggleColorScheme} />
                <Navbar.Collapse id="header-navbar-nav">
                    <Container className="mobile-header d-flex flex-column justify-content-between w-auto ms-auto me-0">
                        <Nav className="ml-auto d-md-flex gap-md-3 align-items-xl-center" variant={variant}>
                            <NavLinkWithLocale
                                trans={t}
                                current={router.pathname}
                                textKey="header.home"
                                href="/"
                                locale={i18n.language}
                            />
                            <NavLinkWithLocale
                                trans={t}
                                current={router.pathname}
                                textKey="header.topics"
                                href="/topics/all"
                                locale={i18n.language}
                            />
                            <NavLinkWithLocale
                                trans={t}
                                current={router.pathname}
                                textKey="header.booklet"
                                href="/booklet"
                                locale={i18n.language}
                            />
                            <NavLinkWithLocale
                                trans={t}
                                current={router.pathname}
                                textKey="header.download"
                                href="/resources"
                                locale={i18n.language}
                            />
                            <NavLinkWithLocale
                                trans={t}
                                current={router.pathname}
                                textKey="header.about"
                                href="/about"
                                locale={i18n.language}
                            />
                            {/* 
                Need a more extensibile way for future languages but for now this should do
              */}
                            {i18n.language === "en" ? (
                                <NavDropdown title="English" className="d-none d-xl-flex align-items-center">
                                    <NavDropdown.Item href="" onClick={() => handleLanguageChange("ja")}>
                                        日本語
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <NavDropdown title="日本語" className="d-none d-xl-flex align-items-center">
                                    <NavDropdown.Item href="" onClick={() => handleLanguageChange("en")}>
                                        English
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                        <Container className="d-xl-none text-center mobile-menu-footer">
                            <Row className="mb-4">
                                <LanguageSwitcher />
                            </Row>
                            <Image alt="Crane logo" src="/wire-logo.png" width="48" height="48" className="mb-2" />{" "}
                            <Row className="mt-2 mb-5">
                                <p className="mobile-menu-tagline text-light pb-3">
                                    <Trans t={t} i18nKey="header.blurb" />
                                </p>
                            </Row>
                        </Container>
                    </Container>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export { ToggleHeader }
