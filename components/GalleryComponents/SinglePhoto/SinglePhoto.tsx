import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Slide from "@mui/material/Slide"
import Image from "next/image"
import React from "react"
import LightBox from "../LightBox/LightBox"

interface SingleProps {
    img: {
        src: string
        title: string
        alt?: string
    }
    subTitle?: string
}

export const SingleImage = ({ img, subTitle }: SingleProps) => {
    const [lightBox, setLightBox] = React.useState(false)
    const [index, setImage] = React.useState(0)

    const handleOpen = (__i__: number) => {
        setImage(__i__)
        setLightBox(true)
    }

    return (
        <>
            <div className="topic-carousel-container d-flex flex-column align-items-center position-relative w-100">
                <div className="home-invite-inner mb-0 mb-md-2" style={{ aspectRatio: "unset", width: "100%" }}>
                    {subTitle && (
                        <p className="gallerySubtitle" style={{ marginLeft: "1px", marginTop: "4px" }}>
                            {subTitle}
                        </p>
                    )}
                    <div
                        className={`w-100 d-flex flex-column justify-content-center align-items-center ${
                            subTitle ? "mt-2 mt-md-4" : ""
                        }`}
                    >
                        <Image
                            className="carousel-image"
                            alt={img?.alt || img.title}
                            src={img.src}
                            width={1800}
                            height={1200}
                            style={{
                                maxHeight: "none",
                                width: "100%",
                                height: "100%",
                                aspectRatio: "unset",
                            }}
                            onClick={() => handleOpen(index)}
                        />
                    </div>
                </div>
            </div>
            <Modal
                open={lightBox}
                onClose={() => {
                    setLightBox(false)
                }}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Slide direction="up" in={lightBox} mountOnEnter unmountOnExit>
                    <Box className="carouselBox">
                        <LightBox
                            index={index}
                            setImage={setImage}
                            images={[img]}
                            lightBox={lightBox}
                            setLightBox={setLightBox}
                            setGallery={() => {}}
                        />
                    </Box>
                </Slide>
            </Modal>
        </>
    )
}
