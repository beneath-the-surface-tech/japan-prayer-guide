import { render, screen } from "@testing-library/react"
import PrayerPoints, { PrayerDisplayStyle } from "../../../../components/common/PrayerPoints/PrayerPoints"

jest.mock("next-i18next", () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str) => str,
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

describe("Prayer Points", () => {
    beforeEach(() => {
        const useRouter = jest.spyOn(require("next/router"), "useRouter")
        useRouter.mockReturnValue({
            push: () => {},
        })
    })

    test("Snapshot test", () => {
        // This test is to check against unintended changes.
        // If the change is intentional you can update the snapshot with `jest --updateSnapshot`

        const t = jest.fn()
        t.mockReturnValue(["A", "B"])

        const component = render(<PrayerPoints topicTrans={t} displayStyle={PrayerDisplayStyle.Featured} />)
        expect(component).toMatchSnapshot()
    })

    test("Renders a topic page prayer section with the right text inside", () => {
        const testPrayerSummary = "<ul><li>Pray that Japanese Christians would have the courage to be open about their faith at work.</li><li>Pray that Christians would see their work as an important way they can serve God in the world and be a light to their coworkers.</li><li>Pray that Christians in positions of influence would impact their workplace culture and values in godly ways.</li></ul>"
        const expectedDisplayStyle = "topicTop"

        const translation = jest.fn()
        translation.mockReturnValue(testPrayerSummary)

        render(<PrayerPoints topicTrans={translation} displayStyle={PrayerDisplayStyle.TopicTop} />)
        const componentContainer = screen.getByTestId("prayer-points-container")
        // const TopicPrayerPointsTitle = screen.getByTestId("prayer-points-title")
        const cardBody = screen.getByTestId("prayer-points-body")
        const prayerPoints = screen.getByTestId("prayer-points-points").getElementsByTagName('ul')[0].children;

        expect(componentContainer).toHaveClass("d-flex", "container", "px-6")
        expect(cardBody).toHaveClass("card-body", expectedDisplayStyle)
        // expect(TopicPrayerPointsTitle).toHaveClass("px-2", "pb-3", "d-flex")

        expect(prayerPoints.length).toBe(3)
        expect(prayerPoints[0].tagName).toBe("LI")
        expect(testPrayerSummary).toContain(prayerPoints[0]!.textContent!)
        expect(testPrayerSummary).toContain(prayerPoints[1]!.textContent!)
        expect(testPrayerSummary).toContain(prayerPoints[2]!.textContent!)
    })

    test("Renders a featured prayer section", () => {
        const testPrayerSummary = "<ul><li>Pray that Japanese Christians would have the courage to be open about their faith at work.</li><li>Pray that Christians would see their work as an important way they can serve God in the world and be a light to their coworkers.</li></ul>"
        const expectedDisplayStyle = "featured"

        const translation = jest.fn()
        translation.mockReturnValue(testPrayerSummary)

        render(<PrayerPoints topicTrans={translation} displayStyle={PrayerDisplayStyle.Featured} />)
        const componentContainer = screen.getByTestId("prayer-points-container")
        const title = screen.getByTestId("prayer-points-title")
        const cardBody = screen.getByTestId("prayer-points-body")
        const prayerPoints = screen.getByTestId("prayer-points-points").getElementsByTagName('ul')[0].children

        expect(componentContainer).toHaveClass("d-flex", "container", "px-6")
        expect(title).toHaveClass("px-2", "pb-2", "fs-2", "border-bottom", "border-grey", "prayer-title", "card-text")
        expect(cardBody).toHaveClass("card-body", expectedDisplayStyle)

        expect(prayerPoints.length).toBe(2)
        expect(testPrayerSummary).toContain(prayerPoints[0]!.textContent!)
        expect(testPrayerSummary).toContain(prayerPoints[1]!.textContent!)
    })
})
