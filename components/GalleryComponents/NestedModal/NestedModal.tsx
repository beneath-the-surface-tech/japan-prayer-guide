import * as React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Slide from "@mui/material/Slide"

import Backdrop from "@mui/material/Backdrop"
import Gallery from "../Gallery/Gallery"
import { Row } from "react-bootstrap"
import Image from "next/image"

const style = {
    position: "absolute",
    width: "100%",
    height: "100vh",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    overflow: "auto",
}

interface NestedModalProps {
    images: {
        src: string
        title: string
        alt?: string
    }[]
    subTitle: string
    galleryTitle: string
    imageText: string
}

export const NestedModal = ({ images, subTitle, galleryTitle, imageText }: NestedModalProps) => {
    const [open, setOpen] = React.useState(false)

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const [lightBox, setLightBox] = React.useState(false)
    const [index, setImage] = React.useState(0)

    return (
        <div>
            <div className="container" style={{ marginTop: "12px" }}>
                <p className="gallerySubtitle">{subTitle}</p>
                <Row className="galleryContainer" xl={4} sm={2} md={2} xs={2}>
                    {[...images].splice(0, 4).map((item, index) => {
                        if (index !== 3) {
                            return (
                                <div className="galleryImage" key={index} onClick={handleOpen}>
                                    <Image
                                        key={index}
                                        src={item.src}
                                        width={1800}
                                        height={1200}
                                        className="galleryImage"
                                        alt={item?.alt || item.title}
                                    />
                                    <div className="galleryImageOverlay"></div>
                                </div>
                            )
                        } else {
                            return (
                                <div className="galleryImage" key={index} onClick={handleOpen}>
                                    <Image
                                        key={index}
                                        src={item.src}
                                        width={1800}
                                        height={1200}
                                        className="galleryImage"
                                        alt={item?.alt || item.title}
                                    />
                                    <div className="galleryMoreOverlay">
                                        <div className="galleryMoreNumber">{`+${images.length - 4}`}</div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </Row>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                    <Box sx={{ ...style, width: "100%" }}>
                        <Gallery
                            images={images}
                            setGallery={setOpen}
                            index={index}
                            setImage={setImage}
                            lightBox={lightBox}
                            setLightBox={setLightBox}
                            galleryTitle={galleryTitle}
                            imageText={imageText}
                        />
                    </Box>
                </Slide>
            </Modal>
        </div>
    )
}
