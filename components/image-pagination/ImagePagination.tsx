import React, { useState } from "react"
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri"
import { Container } from "react-bootstrap"
import Image, { StaticImageData } from "next/image"

interface Page {
    src: StaticImageData
    text?: string
}

interface ImagePaginationProps {
    // Two-page spreads, shown at the lg breakpoint (992px) and up
    desktopPages: Page[]
    // Single pages, shown below lg. Spread n holds single pages 2n and 2n + 1.
    mobilePages: Page[]
    barDisplay?: boolean
}

interface PagerProps {
    pages: Page[]
    activeIndex: number
    onPrev: () => void
    onNext: () => void
    barDisplay: boolean
    className: string
}

const Pager = ({ pages, activeIndex, onPrev, onNext, barDisplay, className }: PagerProps) => (
    <div className={className}>
        <Container className="d-flex justify-content-center">
            <button type="button" onClick={onPrev} className="image-pagination-button" aria-label="previous page">
                <RiArrowLeftSLine size={32} />
            </button>
            <Container className="image-pagination-images">
                {pages.map((img, idx) => (
                    <div
                        className="image-pagination"
                        style={activeIndex === idx ? { display: "block" } : { display: "none" }}
                        key={`${img.src.src}_${idx}`}
                    >
                        <Image src={img.src} alt={img.text || ""} loading="eager" />
                        {img.text && <span>{img.text}</span>}
                    </div>
                ))}
            </Container>
            <button type="button" onClick={onNext} className="image-pagination-button" aria-label="next page">
                <RiArrowRightSLine size={32} />
            </button>
        </Container>
        {barDisplay && (
            <div className="d-flex text-center justify-content-center">
                {pages.map((img, idx) => (
                    <div
                        key={`${img.src.src}_${idx}`}
                        className="bar-display"
                        style={activeIndex === idx ? { backgroundColor: "#285ABD" } : { backgroundColor: "#D6DDE6" }}
                    />
                ))}
            </div>
        )}
    </div>
)

// Both layouts are rendered and CSS shows the one that fits the screen, so the
// right layout appears on first paint instead of switching after JavaScript runs.
const ImagePagination = ({ desktopPages, mobilePages, barDisplay = true }: ImagePaginationProps) => {
    // Position is tracked in single pages so both layouts stay in sync when the
    // window is resized across the breakpoint.
    const [pageIndex, setPageIndex] = useState(0)
    const spreadIndex = pageIndex >> 1

    return (
        <>
            <Pager
                className="d-none d-lg-block"
                pages={desktopPages}
                activeIndex={spreadIndex}
                onPrev={() => setPageIndex(Math.max(spreadIndex - 1, 0) * 2)}
                onNext={() => setPageIndex(Math.min(spreadIndex + 1, desktopPages.length - 1) * 2)}
                barDisplay={barDisplay}
            />
            <Pager
                className="d-lg-none"
                pages={mobilePages}
                activeIndex={pageIndex}
                onPrev={() => setPageIndex((i) => Math.max(i - 1, 0))}
                onNext={() => setPageIndex((i) => Math.min(i + 1, mobilePages.length - 1))}
                barDisplay={barDisplay}
            />
        </>
    )
}

export default ImagePagination
