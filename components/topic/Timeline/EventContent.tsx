import React from "react"
import { motion } from "motion/react"
import { Image } from "react-bootstrap"
import styles from "./Timeline.module.scss"
import { PhotosWrapper } from "@/components/GalleryComponents/PhotosWrapper/PhotosWrapper"

interface EventContentProps {
    activeEvent: any // TimelineEvent, but avoid circular import for now
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
                {activeEvent.galleryType !== "single" && (
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
            </div>
        )}
    </motion.div>
)

export default EventContent
