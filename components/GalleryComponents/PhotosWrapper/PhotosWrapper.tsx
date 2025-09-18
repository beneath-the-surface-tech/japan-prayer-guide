import { ImageCarousel } from "../Carousel/Carousel"
import { Mosaic } from "../Mosaic/Mosaic"
import { NestedModal } from "../NestedModal/NestedModal"

interface PhotosWrapperProps {
    type: string
    images: {
        src: string
        title: string
        alt?: string
    }[]
    blocks?: number[]
    subTitle?: string
    galleryTitle?: string
    imageText?: string
    uncropped?: {
        src: string
        title: string
        alt?: string
    }[]
    alwaysDesktop?: boolean
}

export const PhotosWrapper = ({
    type = "gallery",
    images = [],
    blocks = [],
    subTitle = "",
    galleryTitle = "",
    imageText = "",
    uncropped = [],
    alwaysDesktop = false,
}: PhotosWrapperProps) => {
    if (type === "mosaic") {
        return (
            <Mosaic
                images={images}
                uncropped={uncropped}
                subTitle={subTitle}
                blocks={blocks}
                alwaysDesktop={alwaysDesktop}
            />
        )
    }
    if (type === "gallery") {
        return <NestedModal images={images} subTitle={subTitle} galleryTitle={galleryTitle} imageText={imageText} />
    }
    if (type === "carousel") {
        return <ImageCarousel images={images} subTitle={subTitle} topic />
    }
    return <></>
}
