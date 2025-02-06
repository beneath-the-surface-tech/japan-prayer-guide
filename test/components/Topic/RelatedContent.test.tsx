import { render, screen } from "@testing-library/react"
import RelatedContent from "../../../components/topic/RelatedContent/RelatedContent"

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

const setUpTFunctionMock = (labels: string[], links: string[], thumbnails: string[], isLive: boolean[]) => {
    const t: TFunction = jest.fn().mockImplementation((key, params) => {
        if (key === "related.labels") {
            return labels
        } else if (key === "related.links") {
            return links
        } else if (key === "related.thumbs") {
            return thumbnails
        } else if (key === "related.isLive") {
            return isLive
        }
    })
    return t
}

describe("Related Content", () => {
    test("Snapshot test", () => {
        // This test is to check against unintended changes.
        // If the change is intentional you can update the snapshot with `jest --updateSnapshot`

        const testTextArray = ["ab", "cd", "ef", "gh", "ij", "kl"]
        const testTextArray2 = ["/link1", "/link2", "/link3", "/link4", "/link5", "/link6"]
        const testTextArray3 = ["/link1", "/link2", "/link3", "/link4", "/link5", "/link6"]
        const testBoolArray = [true, false, true, false, true, false]
        const t = setUpTFunctionMock(testTextArray, testTextArray2, testTextArray3, testBoolArray)

        const component = render(<RelatedContent topicTrans={t} />)
        expect(component).toMatchSnapshot()
    })

    test("Renders a section with the right text inside", () => {
        const testTextArray = ["Hey how's it going", "I'm doing fine", "Thanks", "great", "awesome", "cool"]
        const testTextArray2 = ["/link1", "/link2", "/link3", "/link4", "/link5", "/link6"]
        const testTextArray3 = ["/link1", "/link2", "/link3", "/link4", "/link5", "/link6"]
        const testBoolArray = [true, false, true, false, true, false]
        const t = setUpTFunctionMock(testTextArray, testTextArray2, testTextArray3, testBoolArray)

        render(<RelatedContent topicTrans={t} />)
        const relatedContentCont = screen.getByTestId("related-content-container")
        const relatedContentTitle = screen.getByTestId("related-content-title")

        expect(relatedContentCont).toHaveClass("d-flex", "flex-column", "my-3")

        expect(relatedContentTitle).toHaveTextContent("relatedTopics.heading")
        expect(relatedContentTitle).toHaveClass("text-primary", "my-4", "fs-1")
    })
})
