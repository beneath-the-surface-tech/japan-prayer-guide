import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Image from "react-bootstrap/Image"
import { IconContext } from "react-icons/lib"
import { BsInstagram, BsVimeo } from "react-icons/bs"
import { FaAmazon } from "react-icons/fa"
import Link from "next/link"
import LanguageSwitcher from "./languageSwitcher"
import { Col } from "react-bootstrap"
import { useTranslation } from "next-i18next"

export default function Footer() {
  const { t } = useTranslation("common")

  const tagline = t("footer.tagline")
  const copyrightText = t("footer.copyright")

  return (
    // Footer needs to be two separate things I THINK because the order of components is different between
    // mobile and large sizes
    <>
      {/* Small screens footer starts here */}
      <div className="w-100 d-xl-none">
        <Container fluid className="bg-primary pt-3" data-testid="footer">
          <LanguageSwitcher />
          {/* This second inner container keeps the footer max-width matched to the header. */}
          <Container>
            <Row className="d-flex justify-content-center mt-4">
              <LinksList additional="" />
            </Row>
            <Row className="d-flex justify-content-center align-items-center pt-3 pb-2">
              {/* another temp inline-style for an image */}
              <Image style={{ maxHeight: "100px", width: "96px" }} src="/wire-logo.png" alt="logo"></Image>
            </Row>
            <Row className="text-center px-3 mx-1">
              <p className="footer-blurb text-white fs-6 fw-light">{tagline}</p>
            </Row>
            <Row className="d-flex justify-content-center align-items-center pt-4 text-white">
              <IconContext.Provider value={{ size: "25px" }}>
                <a className="text-white footer-icon" href="https://vimeo.com/japanprayerguide">
                  <BsVimeo />
                </a>
                <a
                  className="text-white footer-icon"
                  href="https://www.amazon.com/BENEATH-SURFACE-WAYS-PRAY-JAPAN-ebook/dp/B099KSSY79"
                >
                  <FaAmazon />
                </a>
                <a className="text-white footer-icon" href="https://www.instagram.com/omf_japan/">
                  <BsInstagram />
                </a>
              </IconContext.Provider>
            </Row>
            <Row className="text-center py-4 px-3">
              <p className="text-white fs-6 fw-light footer-copyright" data-testid={"copyright"}>
                {copyrightText}
              </p>
            </Row>
          </Container>
        </Container>
      </div>
      {/* Large screens footer starts here */}
      {/* Test ids need to be modified to stop duplicates */}

      <div className="w-100 d-none d-xl-flex flex-column bg-primary align-items-center">
        <div className="footer-language w-75 border-bottom border-grey-6 py-4">
          <LanguageSwitcher />
        </div>
        <Container>
          <Container fluid className="bg-primary pt-3 d-flex" data-testid="footer-2">
            <Col className="d-flex flex-column justify-content-center mt-4 mb-3 px-4" sm={4}>
              <Row className="mb-4">
                <LinksList additional="1" />
              </Row>
              <Row className="pt-3 px-2">
                <p className="text-white fs-5 fw-light footer-copyright" data-testid={"copyright-2"}>
                  {copyrightText}
                </p>
              </Row>
            </Col>
            <Col sm={6}></Col>
            <Col sm={2} className="my-4 pl-5">
              <Row className="d-flex align-items-center pt-2 pb-2">
                {/* another temp inline-style for an image */}
                <Image style={{ maxHeight: "100px", width: "96px" }} src="/wire-logo.png" alt="logo"></Image>
              </Row>
              <Row>
                <p className="footer-blurb text-white">{tagline}</p>
              </Row>
              <Row className="d-flex align-items-center pt-3 pb-4 text-white">
                <IconContext.Provider value={{ size: "25px" }}>
                  <a className="text-white footer-icon" href="https://vimeo.com/japanprayerguide">
                    <BsVimeo />
                  </a>
                  <a
                    className="text-white footer-icon"
                    href="https://www.amazon.com/BENEATH-SURFACE-WAYS-PRAY-JAPAN-ebook/dp/B099KSSY79"
                  >
                    <FaAmazon />
                  </a>
                  <a className="text-white footer-icon" href="https://www.instagram.com/omf_japan/">
                    <BsInstagram />
                  </a>
                </IconContext.Provider>
              </Row>
            </Col>
          </Container>
        </Container>
      </div>
    </>
  )
}

function LinksList({ additional }: { additional: string }) {
  const { t, i18n } = useTranslation("common")

  const siteMapText = t("footer.title")
  const mapLink1Text = t("footer.link1")
  const mapLink2Text = t("footer.link2")
  const mapLink3Text = t("footer.link3")
  const mapLink4Text = t("footer.link4")
  const mapLink5Text = t("footer.link5")

  return (
    <div data-testid={"linksList" + additional} className="d-flex flex-column px-3 gap-0 text-white">
      <p className="m-1 fs-5 fw-bold">{siteMapText}</p>
      <Link href="/" className="m-1 fs-6 fw-lighter text-white text-decoration-none" locale={i18n.language}>
        {mapLink1Text}
      </Link>
      <Link href="/topics/all" className="m-1 fs-6 fw-lighter text-white text-decoration-none" locale={i18n.language}>
        {mapLink2Text}
      </Link>
      <Link href="/booklet" className="m-1 fs-6 fw-lighter text-white text-decoration-none" locale={i18n.language}>
        {mapLink3Text}
      </Link>
      <Link href="/resources" className="m-1 fs-6 fw-lighter text-white text-decoration-none" locale={i18n.language}>
        {mapLink4Text}
      </Link>
      <Link href="/about" className="m-1 fs-6 fw-lighter text-white text-decoration-none" locale={i18n.language}>
        {mapLink5Text}
      </Link>
    </div>
  )
}
