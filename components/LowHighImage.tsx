import Image, { ImageProps, StaticImageData } from "next/image"
import { useState } from "react"

interface LowHighImageProps extends ImageProps {
    highSrc: string | StaticImageData
    isMainImage?: boolean // large or main images like the hero banner should be preloaded
}

type LoadingValue = "eager" | "lazy" | undefined

export const LowHighImage = ({ highSrc, isMainImage = false, src, alt, ...rest }: LowHighImageProps) => {
    const [toggleDisplay, setToggleDisplay] = useState(false)
    const loadingStyle: LoadingValue = isMainImage ? "eager" : "lazy"
    const priorityLoad: boolean = isMainImage ? true : false

    const isStringType = (type: any) => {
        return typeof type === "string"
    }

    const srcFill: boolean = isStringType(src) ? true : false // next/Image requires explicit width/height unless fill = true
    const highSrcFill: boolean = typeof highSrc === "string" ? true : false

    // note: d-block and d-none on the next/image component does not seem to work, hence inline styling
    return (
        <>
            <Image
                alt={alt}
                src={src}
                fill={srcFill}
                {...rest}
                style={{ display: !toggleDisplay ? "block" : "none" }}
            />
            <Image
                alt={alt}
                src={highSrc}
                {...rest}
                style={{ display: toggleDisplay ? "block" : "none" }}
                onLoad={() => setToggleDisplay(true)}
                loading={loadingStyle}
                priority={priorityLoad}
                fill={highSrcFill}
            />
        </>
    )
}
