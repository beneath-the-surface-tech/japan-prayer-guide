import { render, screen } from "@testing-library/react"
import PrayerResponse from "../../../../components/topic/PrayerResponse/PrayerResponse"

jest.mock("next-i18next", () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str: any) => str,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        }
    },
    Trans: (props: any) => {
        if (props.children) {
            // mock for <Trans>{value}</Trans>
            return props.children
        } else if (props.i18nKey) {
            // mock for <Trans t={t} i18nKey={value} />
            return props.i18nKey
        }
        return props
    },
}))

jest.mock("../../../../components/common/PrayerPoints/PrayerPoints")

describe("Responding in Prayer", () => {
    beforeEach(() => {
        const useRouter = jest.spyOn(require("next/router"), "useRouter")
        useRouter.mockReturnValue({
            push: () => {},
        })
    })

    test("Snapshot test", () => {
        // This test is to check against unintended changes.
        // If the change is intentional you can update the snapshot with `jest --updateSnapshot`

        const component = render(<PrayerResponse topicTrans={jest.fn() as any} />)
        expect(component).toMatchSnapshot()
    })

    test("Renders a section with the right text inside", () => {
        render(<PrayerResponse topicTrans={jest.fn() as any} />)
        const responseSection = screen.getByTestId("prayer-response")
        const responseTitle = responseSection.querySelector("h2")

        const feedbackSection = screen.getByTestId("feedback")
        const feedbackTitle = responseSection.querySelector("h3")
        const feedbackLabel = feedbackSection.querySelector("textarea[name='message']")
        const feedbackEmail: HTMLInputElement = feedbackSection.querySelector('input[type="email"]') as HTMLInputElement
        const feedbackSubmit = feedbackSection.querySelector('button[type="submit"]')

        expect(responseTitle?.textContent).toBe("response.title")
        expect(responseTitle).toHaveClass("fw-bold", "text-primary")

        expect(feedbackTitle?.textContent).toBe("response.recordingLabel")
        expect(feedbackLabel?.getAttribute("placeholder")).toBe("response.feedbackTextPlaceholder")
        expect(feedbackEmail?.type).toBe("email")

        expect(feedbackSubmit).toHaveClass("fw-bold", "px-3", "btn", "btn-outline-primary")
        expect(feedbackSubmit?.textContent).toBe("response.feedbackSubmit")
    })
})
