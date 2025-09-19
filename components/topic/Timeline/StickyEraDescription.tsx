import React from "react"
import { motion } from "motion/react"
import styles from "./Timeline.module.scss"

interface StickyEraDescriptionProps {
    era: { era: string; title: string }
    textColor: string
    scrollDirection: "up" | "down"
    stickyRef?: React.RefObject<HTMLDivElement>
}

const StickyEraDescription: React.FC<StickyEraDescriptionProps> = ({ era, textColor, stickyRef }) => (
    <div className={styles.stickyContainer} ref={stickyRef}>
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{ opacity: 1, y: 0, color: textColor }}
            transition={{ duration: 0.5 }}
            key={era.era}
        >
            <h2 className={styles.eraYear}>{era.era}</h2>
            <h3 className={styles.eraTitle}>{era.title}</h3>
        </motion.div>
    </div>
)

export default StickyEraDescription
