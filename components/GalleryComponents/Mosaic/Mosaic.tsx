import * as React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Slide from "@mui/material/Slide"

import LightBox from "../LightBox/LightBox"
import {
    MosaicBlockFive,
    MosaicBlockFour,
    MosaicBlockOne,
    MosaicBlockSeven,
    MosaicBlockSix,
    MosaicBlockTwo,
    MosaicBlockEight,
    MosaicBlockNine,
    MosaicBlockThree,
} from "./MosaicBlocks"

const blockMap: any = {
    1: {
        component: MosaicBlockOne,
        numImgs: 1,
    },
    2: {
        component: MosaicBlockTwo,
        numImgs: 2,
    },
    3: {
        component: MosaicBlockThree,
        numImgs: 2,
    },
    4: {
        component: MosaicBlockFour,
        numImgs: 2,
    },
    5: {
        component: MosaicBlockFive,
        numImgs: 2,
    },
    6: {
        component: MosaicBlockSix,
        numImgs: 3,
    },
    7: {
        component: MosaicBlockSeven,
        numImgs: 3,
    },
    8: {
        component: MosaicBlockEight,
        numImgs: 3,
    },
    9: {
        component: MosaicBlockNine,
        numImgs: 3,
    },
}

interface MosaicProps {
    images: {
        src: string
        title: string
        alt?: string
    }[]
    uncropped: {
        src: string
        title: string
        alt?: string
    }[]
    blocks: number[]
    subTitle: string
}

export const Mosaic = ({ images, blocks, uncropped, subTitle }: MosaicProps) => {
    const [lightBox, setLightBox] = React.useState(false)
    const [index, setImage] = React.useState(0)

    const handleOpen = (__i__: number) => {
        setImage(__i__)
        setLightBox(true)
    }

    // For smaller than desktop
    let idx = 0
    const calculatedStarts = []
    for (let i = 0; i < blocks.length; i++) {
        if (i == 0) {
            calculatedStarts.push(idx)
        } else {
            idx = idx + blockMap[blocks[i - 1]].numImgs
            calculatedStarts.push(idx)
        }
    }

    const firstHalf = calculatedStarts.slice(0, Math.ceil(calculatedStarts.length / 2))
    const secondHalf = calculatedStarts.slice(Math.ceil(calculatedStarts.length / 2))
    const halfBlocks = blocks.length / 2

    return (
        <>
            <p className="gallerySubtitle" style={{ marginBottom: "-20px", marginLeft: "1px", marginTop: "8px" }}>
                {subTitle}
            </p>
            <div className="flex-column" style={{ display: "flex", alignItems: "center" }}>
                <div
                    className="d-flex align-items-center justify-content-center flex-column d-xl-none"
                    style={{ marginTop: "50px" }}
                >
                    {calculatedStarts.map((num, idx) => {
                        const MosaicComponent = blockMap[blocks[idx]].component ?? MosaicBlockOne
                        return <MosaicComponent key={idx} images={images} startIdx={num} handleOpen={handleOpen} />
                    })}
                </div>
                <div
                    className="d-none d-xl-flex w-100 align-items-center justify-content-center p-0"
                    style={{ marginTop: "50px", boxSizing: "border-box" }}
                >
                    {firstHalf.map((num, idx) => {
                        const MosaicComponent = blockMap[blocks[idx]].component ?? MosaicBlockOne
                        return <MosaicComponent key={idx} images={images} startIdx={num} handleOpen={handleOpen} />
                    })}
                </div>
                <div
                    className="d-none d-xl-flex w-100 align-items-center justify-content-center p-0"
                    style={{ boxSizing: "border-box" }}
                >
                    {secondHalf.map((num, idx) => {
                        const MosaicComponent = blockMap[blocks[idx + halfBlocks]].component ?? MosaicBlockOne
                        return (
                            <MosaicComponent
                                key={idx + halfBlocks}
                                images={images}
                                startIdx={num}
                                handleOpen={handleOpen}
                            />
                        )
                    })}
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
                        <Box className="galleryBox">
                            <LightBox
                                index={index}
                                setImage={setImage}
                                images={uncropped}
                                lightBox={lightBox}
                                setLightBox={setLightBox}
                                setGallery={() => {}}
                            />
                        </Box>
                    </Slide>
                </Modal>
            </div>
        </>
    )
}
