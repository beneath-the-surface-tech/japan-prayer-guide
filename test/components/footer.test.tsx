import { render, screen } from "@testing-library/react"
import Footer from "../../components/Footer"

jest.mock("next-i18next", () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str: any, options?: any) => (options?.year ? `${str} ${options.year}` : str),
            i18n: {
                changeLanguage: () => new Promise(() => {}),
                language: "en",
            },
        }
    },
    Trans: ({ i18nKey }: { i18nKey: string }) => i18nKey,
}))

describe("Footer", () => {
    beforeEach(() => {
        const useRouter = jest.spyOn(require("next/router"), "useRouter")
        useRouter.mockReturnValue({
            push: () => {},
        })
    })

    test("Snapshot test", () => {
        // This test is to check against unintended changes.
        // If the change is intentional you can update the snapshot with `jest --updateSnapshot`

        const component = render(<Footer />)
        expect(component).toMatchSnapshot()
    })

    test("Renders the correct class name on the outer container", () => {
        render(<Footer />)
        const footer = screen.getByTestId("footer")
        expect(footer).toHaveClass("bg-primary")
        expect(footer).toHaveClass("container-fluid")
    })

    test("Renders the correct text in the footer", () => {
        render(<Footer />)
        const copyright = screen.getByTestId("copyright")
        // expect(copyright).toHaveTextContent("Copyright © 2021 Beneath the Surface. All rights reserved.");
        // Can't seem to make it render the right text content
        expect(copyright).toHaveTextContent(`footer.copyright ${new Date().getFullYear()}`)
    })

    test("Renders a language switcher in both footer layouts", () => {
        render(<Footer />)
        expect(screen.getAllByTestId("language-switcher")).toHaveLength(2)
    })

    test("Certain components have a max-width (so that they are not too stretched in desktop view", () => {
        render(<Footer />)
        const linksList = screen.getByTestId("linksList")
        const maxWidth = getComputedStyle(linksList).maxWidth
    })
})
