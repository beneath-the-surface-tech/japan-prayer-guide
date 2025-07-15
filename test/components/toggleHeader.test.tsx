import { render, fireEvent } from "@testing-library/react"
import { ToggleHeader } from "../../components/ToggleHeader"

jest.mock("react-i18next", () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str: any) => str,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        }
    },
    Trans: ({ i18nKey }: { i18nKey: string }) => i18nKey,
}))

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
})

describe("ToggleHeader", () => {
    beforeEach(() => {
        const useRouter = jest.spyOn(require("next/router"), "useRouter")
        useRouter.mockReturnValue({
            push: () => {},
        })
    })

    test("Snapshot test", () => {
        // This test is to check against unintended changes.
        // If the change is intentional you can update the snapshot with `jest --updateSnapshot`

        const component = render(<ToggleHeader />)
        expect(component).toMatchSnapshot()
    })

    test("renders a Navbar with a white background and light variant by default", () => {
        const { getByRole } = render(<ToggleHeader />)
        const navbar = getByRole("navigation")
        expect(navbar).toHaveClass("bg-white")
        expect(navbar).toHaveClass("navbar-light")
    })

    test("clicking the Navbar.Toggle toggles the color scheme to the dark variant", () => {
        const { getByTestId, getByRole } = render(<ToggleHeader />)
        const toggleButton = getByTestId("main-nav-toggle")
        fireEvent.click(toggleButton)
        const navbar = getByRole("navigation")
        expect(navbar).toHaveClass("bg-primary")
        expect(navbar).toHaveClass("navbar-dark")
    })

    test("clicking the Navbar.Toggle twice toggles the color scheme back to the light variant", () => {
        const { getByTestId, getByRole } = render(<ToggleHeader />)
        const toggleButton = getByTestId("main-nav-toggle")
        fireEvent.click(toggleButton)
        fireEvent.click(toggleButton)
        const navbar = getByRole("navigation")
        expect(navbar).toHaveClass("bg-white", "navbar-light", "shadow-sm")
    })

    test("should not render with shadows if specified", () => {
        const { getByRole } = render(<ToggleHeader hideShadow={true} />)
        const navbar = getByRole("navigation")
        expect(navbar).toHaveClass("bg-white", "navbar-light", "fixed-top")
        expect(navbar).not.toHaveClass("shadow-sm")
    })
})
