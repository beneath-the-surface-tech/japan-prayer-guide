import { render, screen } from "@testing-library/react"
import { TFunction } from "next-i18next"
import TopicDownloadables from "../../../../components/topic/TopicDownloadables/TopicDownloadables"

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

const setUpTFunctionMock = (urls: Record<string, string>) => {
    const t: TFunction = jest.fn().mockImplementation((key: string) => {
        if (key in urls) {
            return urls[key]
        } else {
            return key
        }
    })
    return t
}

describe("Topic Downloadables", () => {
    test("Snapshot test", () => {
        // This test is to check against unintended changes.
        // If the change is intentional you can update the snapshot with `jest --updateSnapshot`

        const t = setUpTFunctionMock({})

        const component = render(<TopicDownloadables topicTrans={t} />)
        expect(component).toMatchSnapshot()
    })

    test("Renders a section with the right text inside", () => {
        const mockUrls = {
            "downloads.infographicsUrl": "value",
            "downloads.photographyUrl": "url2",
            "downloads.pdfUrl": "url3",
            "downloads.prayerPtsUrl": "",
            "downloads.prayerVidUrl": "url5",
            "downloads.slidesUrl": "url6",
        }
        const t = setUpTFunctionMock(mockUrls)

        render(<TopicDownloadables topicTrans={t} />)
        const topicDownloadablesCont = screen.getByTestId("topic-downloadables-container")
        const topicDownloadablesTitle = screen.getByTestId("topic-downloadables-title")
        const topicDownloadablesLinks = screen.getByTestId("topic-downloadables-links").children

        expect(topicDownloadablesCont).toHaveClass("d-flex", "flex-column", "my-3")

        expect(topicDownloadablesTitle).toHaveTextContent("downloads.title")
        expect(topicDownloadablesTitle).toHaveClass("text-primary", "mt-4", "mb-3", "fw-bold")

        expect(topicDownloadablesLinks.length).toBe(6)
        expect(topicDownloadablesLinks[0]).toHaveTextContent("downloads.infographicsLabel")
        expect(topicDownloadablesLinks[0]).toHaveClass("col")
        expect(topicDownloadablesLinks[0].children[0].getAttribute("href")).toBe("value")
    })

    test("sets disabled if no url provided", () => {
        const mockUrls = {
            "downloads.infographicsUrl": "url1",
            "downloads.photographyUrl": "",
            "downloads.pdfUrl": "",
            "downloads.prayerPtsUrl": "",
            "downloads.prayerVidUrl": "",
            "downloads.slidesUrl": "",
        }
        const t = setUpTFunctionMock(mockUrls)

        const { getByText } = render(<TopicDownloadables topicTrans={t} />)

        const topicDownloadablesLinks = screen.getByTestId("topic-downloadables-links").children
        const enabledCard = getByText("downloads.infographicsLabel")
        expect(enabledCard.parentNode).not.toHaveClass("disabled")
        expect(topicDownloadablesLinks[0].children[0].getAttribute("href")).toBe("url1")

        const disabledCard = getByText("downloads.photographyLabel")
        expect(disabledCard.parentNode).toHaveClass("disabled")
    })
})
