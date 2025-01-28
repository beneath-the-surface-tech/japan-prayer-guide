import React, { useEffect } from "react"
import { Cross } from "../../icons"
import { Trans } from "next-i18next"
import Image from "next/image"

interface LightBoxProps {
    index: number
    setImage: React.Dispatch<React.SetStateAction<number>>
    images: {
        src: string
        title: string
        alt?: string
    }[]
    setGallery: React.Dispatch<React.SetStateAction<boolean>>
    setLightBox: React.Dispatch<React.SetStateAction<boolean>>
    lightBox: boolean
}

const LightBox = ({ index, setImage, images, lightBox, setLightBox }: LightBoxProps) => {
    const handleSwitch = (type: string) => {
        if (type === "inc" && index + 1 !== images.length) {
            setImage(index + 1)
        }
        if (type === "dec" && index !== 0) {
            setImage(index - 1)
        }
    }

    useEffect(() => {
        const keyDownHandler = (e: KeyboardEvent) => {
            if (e.code === "ArrowRight") {
                handleSwitch("inc")
            }
            if (e.code === "ArrowLeft") {
                handleSwitch("dec")
            }
        }
        document.addEventListener("keydown", keyDownHandler)

        // clean up
        return () => {
            document.removeEventListener("keydown", keyDownHandler)
        }
    }, [index])

    return (
        <div className="lightbox">
            <div className="lightbox-container">
                <div className="lightbox-header">
                    <span onClick={() => setLightBox(!lightBox)} className="headLeft">
                        <span style={{ marginTop: "6px" }}></span>
                    </span>
                    <span>
                        {index + 1}/{images.length}
                    </span>
                    <span onClick={() => setLightBox(!lightBox)} className="headRight">
                        <Cross />
                    </span>
                </div>
                <div className="lightbox-body">
                    <div className="lightbox-auto lightbox-leftArrow">
                        {index !== 0 && (
                            <span
                                className="lightbox-arrow lightbox-left-icon"
                                onClick={() => handleSwitch("dec")}
                            ></span>
                        )}
                    </div>
                    <div className="lightbox-box">
                        <Image
                            src={images[index].src}
                            width={1800}
                            height={1200}
                            alt={images[index]?.alt || images[index].title}
                        />
                    </div>
                    <h1>
                        <Trans>{images[index].title}</Trans>
                    </h1>
                    <div className="lightbox-auto lightbox-rightArrow">
                        {index + 1 !== images.length && (
                            <span
                                className="lightbox-arrow lightbox-right-icon"
                                onClick={() => handleSwitch("inc")}
                            ></span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LightBox
