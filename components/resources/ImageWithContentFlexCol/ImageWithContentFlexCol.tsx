import React, { ReactNode } from "react"
import { Container } from "react-bootstrap"
import { Trans, useTranslation } from "next-i18next"
import { StaticImageData } from "next/image"
import NextImage from "../../common/NextImage/NextImage"
import { LinkFromJson } from "@/components/common/LinkFromJson"

// Used to position the heading between text either above or below the image
export enum TextPosition {
    Above,
    Below,
}

interface ResourceProps {
    className?: string
    src: StaticImageData
    imgAltKey: string
    contentClass?: string
    headingClass?: string
    headingKey: string
    headerPosition?: TextPosition
    descriptionArrayKey: string
    descriptionUrlArray?: string[]
    children?: ReactNode
}

export default function ImageWithContentFlexCol({
    className = "",
    src,
    imgAltKey,
    contentClass = "",
    headingClass = "",
    headingKey,
    headerPosition = TextPosition.Above,
    descriptionArrayKey,
    descriptionUrlArray = [],
    children,
}: ResourceProps) {
    const { t } = useTranslation("resources")

    const heading: string = t(headingKey)
    const imgAlt: string = t(imgAltKey)
    let descriptions: string[] = t(descriptionArrayKey, { returnObjects: true }) as string[]
    descriptions = Array.isArray(descriptions) ? descriptions : []

    return (
        <Container className={"d-flex flex-column my-4 image-content-flex " + className}>
            {headerPosition === TextPosition.Above && (
                <h3 className={"text-primary " + headingClass}>
                    <Trans>{heading}</Trans>
                </h3>
            )}
            <NextImage src={src} alt={imgAlt} className={"mb-4 content-image"} />
            <div className={"d-flex flex-column " + contentClass}>
                {headerPosition === TextPosition.Below && (
                    <h3 className={"text-primary " + headingClass}>
                        <Trans>{heading}</Trans>
                    </h3>
                )}

                {descriptions.map((description, idx) => (
                    <p key={description.substring(0, 5) + idx}>
                        <Trans components={[<LinkFromJson key={description} href={descriptionUrlArray[idx]} />]}>
                            {description}
                        </Trans>
                    </p>
                ))}
            </div>
            <br />
            {children}
        </Container>
    )
}
