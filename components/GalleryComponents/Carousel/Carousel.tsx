import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Slide from "@mui/material/Slide"
import Image from "next/image"
import React from "react"
import { Carousel, CarouselItem } from "react-bootstrap"
import LightBox from "../LightBox/LightBox"

interface CarouselProps {
    images: {
        src: string
        title: string
        alt?: string
    }[]
    topic?: boolean
    subTitle?: string
}

export const ImageCarousel = ({ images, topic = false, subTitle }: CarouselProps) => {
    const [lightBox, setLightBox] = React.useState(false)
    const [index, setImage] = React.useState(0)

    const handleOpen = (__i__: number) => {
        setImage(__i__)
        setLightBox(true)
    }

    if (topic)
        return (
            <>
                <div className="topic-carousel-container d-flex flex-column align-items-center position-relative w-100">
                    <div className="home-invite-inner mb-0 mb-md-2" style={{ aspectRatio: "unset", width: "100%" }}>
                        <p className="gallerySubtitle" style={{ marginLeft: "1px", marginTop: "4px" }}>
                            {subTitle}
                        </p>
                        <Carousel
                            controls={true}
                            fade={true}
                            interval={4000}
                            className="w-100 d-flex flex-column justify-content-center align-items-center mt-2 mt-md-4"
                        >
                            {images.map((img, index) => (
                                <CarouselItem className="w-100 d-flex justify-content-center" key={index}>
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
                                </CarouselItem>
                            ))}
                        </Carousel>
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
                                images={images}
                                lightBox={lightBox}
                                setLightBox={setLightBox}
                                setGallery={() => {}}
                            />
                        </Box>
                    </Slide>
                </Modal>
            </>
        )

    return (
        <div className="home-invitation d-flex flex-column align-items-center position-relative w-100">
            <div className="home-invite-inner mb-0 mb-md-5">
                <Carousel
                    controls={true}
                    fade={true}
                    interval={3000}
                    className="w-100 d-flex flex-column justify-content-center align-items-center mt-5"
                >
                    {images.map((img, index) => (
                        <CarouselItem className="w-100 d-flex justify-content-center" key={index}>
                            <Image
                                className="home-carousel-image"
                                alt={"hero image" + index}
                                src={img.src}
                                width={1400}
                                height={725}
                            />
                        </CarouselItem>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}
