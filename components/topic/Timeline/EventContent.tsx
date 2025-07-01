import React from "react"
import { motion } from "motion/react"
import { Image } from "react-bootstrap"
import styles from "./Timeline.module.scss"
import { PhotosWrapper } from "@/components/GalleryComponents/PhotosWrapper/PhotosWrapper"
import { Mosaic } from "@/components/GalleryComponents/Mosaic/Mosaic"
import type { TimelineEvent, TimelinePhoto } from "@/pages/topics/[topicPage]"
import { Box } from "@mui/material"

interface EventContentProps {
    activeEvent: TimelineEvent // TimelineEvent, but avoid circular import for now
    textColor: string
}

const EventContent: React.FC<EventContentProps> = ({ activeEvent, textColor }) => (
    <motion.div className={styles.eventContent} animate={{ color: textColor }}>
        <h3 className={styles.eventYear}>{activeEvent.year}</h3>
        <p className={styles.eventDescription}>{activeEvent.text_body}</p>
        {activeEvent.photos && activeEvent.photos.length > 0 && (
            <div className={styles.eventImageContainer}>
                {activeEvent.galleryType === "single" && (
                    <Image
                        src={activeEvent.photos[0].src}
                        alt={activeEvent.photos[0].alt || ""}
                        fluid
                        className={styles.eventImage}
                    />
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
                {activeEvent.galleryType === "mosaic" && <CustomMosaicComponent activeEvent={activeEvent} />}
            </div>
        )}
    </motion.div>
)

const CustomMosaicComponent = ({ activeEvent }: { activeEvent: TimelineEvent }) => {
    const imagesPerRow = 9
    const splitPhotos = activeEvent.photos?.reduce((acc: TimelinePhoto[][], photo: TimelinePhoto, index: number) => {
        if (index % imagesPerRow === 0) {
            acc.push([photo])
        } else {
            acc[acc.length - 1].push(photo)
        }
        return acc
    }, [])

    console.log(splitPhotos)

    return (
        <>
            {splitPhotos?.map((photo: TimelinePhoto[], index: number) => (
                <Box mt="-55px" position="relative" key={index}>
                    <Mosaic
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
                        blocks={[5, 4, 1, 8]}
                        subTitle=""
                    />
                </Box>
            ))}
        </>
    )
}

export default EventContent
