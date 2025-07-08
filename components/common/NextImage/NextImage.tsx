import Image, { ImageProps, StaticImageData } from "next/image"
import { Container } from "react-bootstrap"
import styles from "./NextImage.module.css"

interface NextImageProps extends ImageProps {
    src: StaticImageData
    alt: string
    className?: string
}

export default function NextImage({ src, alt, className }: NextImageProps) {
    return (
        <Container className={"px-0 " + styles.imgContainer + " " + className}>
            <Image className={styles.coverFit} alt={alt} src={src} fill={true} />
        </Container>
    )
}
