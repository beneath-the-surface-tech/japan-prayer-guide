import React, { ReactNode } from "react"
import { Trans, useTranslation } from "next-i18next"
import { StaticImageData } from "next/image"
import NextImage from "../../common/NextImage/NextImage"
import { LinkFromJson } from "@/components/common/LinkFromJson"

interface ResourceProps {
    className?: string
    src: StaticImageData
    imgAltKey: string
    contentClass?: string
    headingKey: string
    descriptionArrayKey: string
    descriptionUrlArray?: string[]
    children?: ReactNode
}

export default function DownloadTypeFlexCol({
    className = "",
    src,
    imgAltKey,
    contentClass = "",
    headingKey,
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
        <div className={"d-flex flex-column my-4 image-content-flex mb-sm-0 mb-md-0" + className}>
            {/* <div className={"col-lg-6 col-md-12 d-flex flex-column my-4 image-content-flex mb-sm-0 mb-md-0 " + className}> */}
            {/* <div className={"col-xl-6 col-lg-12 d-flex flex-column my-4 image-content-flex mb-sm-0 mb-md-0 " + className}> */}
            <h3 className="text-primary d-none d-xl-block subheading">
                <Trans>{heading}</Trans>
            </h3>
            <NextImage src={src} alt={imgAlt} className={"mx-0 content-image"} />
            <div className={"d-flex flex-column" + contentClass}>
                <h3 className="text-primary d-xl-none subheading">
                    <Trans>{heading}</Trans>
                </h3>

                {descriptions.map((description, idx) => (
                    <p key={description.substring(0, 5) + idx}>
                        <Trans components={[<LinkFromJson key={description} href={descriptionUrlArray[idx]} />]}>
                            {description}
                        </Trans>
                    </p>
                ))}
            </div>
            {children}
        </div>
    )
}
