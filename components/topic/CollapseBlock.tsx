import React, { ReactNode } from "react"
import { Collapse, Container } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri"

interface feedbackProps {
    title: string
    children: ReactNode
    startOpened?: boolean
    galleryType?: string
}

const CollapseBlock = ({ title, children, startOpened = false, galleryType = "mosaic" }: feedbackProps) => {
    const [openCollapse, setOpenCollapse] = React.useState(startOpened)
    const disableAccordion = galleryType === "gallery" || galleryType === "carousel" || galleryType === "mosaic"

    const clickHandler = () => {
        if (disableAccordion) {
            return
        } else {
            setOpenCollapse(!openCollapse)
        }
    }

    const renderChevron = () => {
        if (disableAccordion) {
            return <></>
        } else {
            return openCollapse ? <RiArrowUpSLine /> : <RiArrowDownSLine />
        }
    }

    return (
        <Container>
            {!disableAccordion && <hr className="mb-4" />}
            <Button
                className={"collapse-label fs-2 fw-bold lh-sm ps-0 " + (disableAccordion && "pt-4")}
                onClick={clickHandler}
                aria-controls="collapse-block"
                aria-expanded={openCollapse}
                style={{ cursor: disableAccordion ? "default" : "pointer" }}
            >
                {title} {renderChevron()}
            </Button>
            <Collapse in={openCollapse}>
                <Container className="p-0" id="collapse-block">
                    {children}
                </Container>
            </Collapse>
        </Container>
    )
}

export default CollapseBlock
