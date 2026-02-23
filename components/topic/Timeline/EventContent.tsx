import React from "react"
import { motion } from "motion/react"
import styles from "./Timeline.module.scss"
import { PhotosWrapper } from "@/components/GalleryComponents/PhotosWrapper/PhotosWrapper"
import { Mosaic } from "@/components/GalleryComponents/Mosaic/Mosaic"
import type { TimelineEvent, TimelinePhoto } from "@/pages/topics/[topicPage]"
import { Box } from "@mui/material"

interface EventContentProps {
    activeEvent: TimelineEvent // TimelineEvent, but avoid circular import for now
    textColor: string
    isLast?: boolean
}

const EventContent: React.FC<EventContentProps> = ({ activeEvent, textColor, isLast = false }) => (
    <motion.div className={styles.eventContent} animate={{ color: textColor }}>
        <h3 className={styles.eventYear}>{activeEvent.year}</h3>
        <p className={styles.eventDescription}>{activeEvent.text_body}</p>
        {activeEvent.photos && activeEvent.photos.length > 0 && (
            <div className={styles.eventImageContainer}>
                {activeEvent.galleryType === "single" && (
                    <div className={styles.eventImage}>
                        <PhotosWrapper
                            type="single"
                            images={[
                                {
                                    src: activeEvent.photos[0].src || "",
                                    title: activeEvent.photos[0].title || "",
                                    alt: activeEvent.photos[0].alt || "",
                                },
                            ]}
                            uncropped={[
                                {
                                    src: activeEvent.photos[0].src || "",
                                    title: activeEvent.photos[0].title || "",
                                    alt: activeEvent.photos[0].alt || "",
                                },
                            ]}
                            blocks={[1]}
                        />
                    </div>
                )}
                {activeEvent.galleryType !== "single" && activeEvent.galleryType !== "mosaic" && (
                    <PhotosWrapper
                        type={activeEvent.galleryType}
                        images={activeEvent.photos.map((photo: any) => ({
                            src: photo.src,
                            title: photo.title || "",
                            alt: photo.alt || "",
                        }))}
                        uncropped={activeEvent.photos.map((photo: any) => ({
                            src: photo.src,
                            title: photo.title || "",
                            alt: photo.alt || "",
                        }))}
                        blocks={[5, 4, 1, 8]}
                        alwaysDesktop={true}
                    />
                )}
                {activeEvent.galleryType === "mosaic" && (
                    <CustomMosaicComponent activeEvent={activeEvent} alwaysDesktop={!isLast} />
                )}
            </div>
        )}
    </motion.div>
)

const CustomMosaicComponent = ({
    activeEvent,
    alwaysDesktop = false,
}: {
    activeEvent: TimelineEvent
    alwaysDesktop?: boolean
}) => {
    const imagesPerRow = 9
    const splitPhotos = activeEvent.photos?.reduce((acc: TimelinePhoto[][], photo: TimelinePhoto, index: number) => {
        if (index % imagesPerRow === 0) {
            acc.push([photo])
        } else {
            acc[acc.length - 1].push(photo)
        }
        return acc
    }, [])

    return (
        <>
            {splitPhotos?.map((photo: TimelinePhoto[], index: number) => (
                <Box mt="-55px" position="relative" key={index}>
                    <Mosaic
                        alwaysDesktop={alwaysDesktop}
                        images={photo.map((photo: TimelinePhoto) => ({
                            src: photo.src,
                            title: photo.title || "",
                            alt: photo.alt || "",
                        }))}
                        uncropped={photo.map((photo: TimelinePhoto) => ({
                            src: photo.src,
                            title: photo.title || "",
                            alt: photo.alt || "",
                        }))}
                        blocks={
                            activeEvent.id === 11
                                ? [5, 1, 4, 8]
                                : alwaysDesktop
                                  ? [4, 4, 4, 4]
                                  : index === 0
                                    ? [5, 1, 7, 8]
                                    : [10, 4, 4, 1]
                        }
                        subTitle=""
                    />
                </Box>
            ))}
        </>
    )
}

export default EventContent
