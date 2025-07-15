import React from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { Navbar, Stack } from "react-bootstrap"

interface LanguageSwitcherProps {
    onClickFunc?: (lang: string) => void
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onClickFunc }) => {
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

    const actualOnClick = onClickFunc || handleLanguageChange

    return (
        <Stack
            id="language-switch"
            data-testid="language-switcher"
            direction="horizontal"
            gap={2}
            className="ms-auto justify-content-center"
        >
            <Navbar.Toggle aria-controls="header-navbar-nav">
                <a
                    href="#english"
                    role="button"
                    onClick={() => actualOnClick("en")}
                    className={`ms-auto text-white ${router.locale === "en" ? "active-language-link" : ""}`}
                    data-testid="link-english"
                >
                    English
                </a>
            </Navbar.Toggle>
            <div className="vr border opacity-100" />
            <Navbar.Toggle aria-controls="header-navbar-nav">
                <a
                    href="#japanese"
                    role="button"
                    onClick={() => actualOnClick("ja")}
                    className={`me-auto text-white ${router.locale === "ja" ? "active-language-link" : ""}`}
                    data-testid="link-japanese"
                >
                    日本語
                </a>
            </Navbar.Toggle>
        </Stack>
    )
}

export default LanguageSwitcher
