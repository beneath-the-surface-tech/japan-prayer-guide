import React, { ReactNode } from "react"
import { Trans, useTranslation } from "next-i18next"
import { StaticImageData } from "next/image"
import NextImage from "../../common/NextImage/NextImage"

interface ResourceProps {
    className?: string
    src: StaticImageData
    imgAltKey: string
    contentClass?: string
    headingKey: string
    descriptionArrayKey: string
    children?: ReactNode
}

export default function TutorialFlexCol({
    className = "",
    src,
    imgAltKey,
    contentClass = "",
    headingKey,
    descriptionArrayKey,
    children,
}: ResourceProps) {
    const { t } = useTranslation("resources")

    const heading: string = t(headingKey)
    const imgAlt: string = t(imgAltKey)
    let descriptions: string[] = t(descriptionArrayKey, { returnObjects: true }) as string[]
    descriptions = Array.isArray(descriptions) ? descriptions : []

    return (
        <div
            className={
                "d-flex flex-column flex-md-row flex-xl-column image-content-flex mb-sm-0 mb-md-0 justify-content-center mx-auto" +
                className
            }
        >
            <NextImage src={src} alt={imgAlt} className="mb-4 content-image" unoptimized={true} />
            <div className={"d-flex flex-column " + contentClass}>
                <h3 className="text-primary ps-2 mb-3">
                    <Trans>{heading}</Trans>
                </h3>

                {descriptions.map((description, idx) => (
                    <p key={description.substring(0, 5) + idx}>
                        <Trans>{description}</Trans>
                    </p>
                ))}
            </div>
            <br />
            {children}
        </div>
    )
}
