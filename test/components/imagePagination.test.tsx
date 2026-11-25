import { render, fireEvent } from "@testing-library/react"
import type { StaticImageData } from "next/image"
import ImagePagination from "../../components/image-pagination/ImagePagination"

const page = (name: string) => ({ src: { src: name, height: 10, width: 10 } as StaticImageData })
const desktopPages = [0, 1, 2].map((i) => page(`/spread-${i}.jpg`))
const mobilePages = [0, 1, 2, 3, 4, 5].map((i) => page(`/page-${i}.jpg`))

// Returns the index of the visible image in each layout: [desktop, mobile]
const activeIndexes = (container: HTMLElement) =>
    [".d-none.d-lg-block", ".d-lg-none"].map((selector) =>
        Array.from(container.querySelectorAll(`${selector} .image-pagination`)).findIndex(
            (el) => (el as HTMLElement).style.display === "block",
        ),
    )

const click = (container: HTMLElement, layout: string, label: string, times = 1) => {
    const button = container.querySelector(`${layout} [aria-label="${label}"]`)!
    for (let i = 0; i < times; i++) fireEvent.click(button)
}

describe("ImagePagination", () => {
    it("renders both layouts on the first render so CSS can pick one without a flash", () => {
        const { container } = render(<ImagePagination desktopPages={desktopPages} mobilePages={mobilePages} />)
        expect(container.querySelectorAll(".d-none.d-lg-block .image-pagination")).toHaveLength(3)
        expect(container.querySelectorAll(".d-lg-none .image-pagination")).toHaveLength(6)
        expect(activeIndexes(container)).toEqual([0, 0])
    })

    it("keeps the spread and the single page in sync", () => {
        const { container } = render(<ImagePagination desktopPages={desktopPages} mobilePages={mobilePages} />)
        click(container, ".d-lg-none", "next page", 3)
        expect(activeIndexes(container)).toEqual([1, 3])
        click(container, ".d-none.d-lg-block", "next page")
        expect(activeIndexes(container)).toEqual([2, 4])
        click(container, ".d-none.d-lg-block", "previous page")
        expect(activeIndexes(container)).toEqual([1, 2])
    })

    it("stops at the first and last pages", () => {
        const { container } = render(<ImagePagination desktopPages={desktopPages} mobilePages={mobilePages} />)
        click(container, ".d-none.d-lg-block", "previous page")
        expect(activeIndexes(container)).toEqual([0, 0])
        click(container, ".d-none.d-lg-block", "next page", 5)
        expect(activeIndexes(container)).toEqual([2, 4])
        click(container, ".d-lg-none", "next page", 5)
        expect(activeIndexes(container)).toEqual([2, 5])
    })
})
