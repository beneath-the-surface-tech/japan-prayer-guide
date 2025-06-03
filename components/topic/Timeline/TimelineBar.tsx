import { FC, useRef } from "react"
import { motion } from "motion/react"
import styles from "./Timeline.module.css"
import { TimelineEra } from "../../../pages/topics/[topicPage]"
import { useTimelineContext } from "./TimelineContext"

interface TimelineBarProps {
    activeEra: TimelineEra | null
    activeEventIndex: number
    onEventClick: (eraIndex: number, eventIndex: number) => void
}

const TimelineBar: FC<TimelineBarProps> = ({ activeEra, activeEventIndex, onEventClick }) => {
    const { timelineEras } = useTimelineContext()
    const timelineRef = useRef<HTMLDivElement>(null)

    // Scroll to active event when it changes
    // useEffect(() => {
    //     if (timelineRef.current && activeEra && activeEventIndex >= 0) {
    //         const activeEventElement = timelineRef.current.querySelector(`.${styles.activeEvent}`)

    //         if (activeEventElement) {
    //             activeEventElement.scrollIntoView({
    //                 behavior: "smooth",
    //             })
    //         }
    //     }
    // }, [activeEra, activeEventIndex])

    const renderEraEvents = (era: TimelineEra, eraIndex: number) => {
        if (!era.events) return null

        return era.events.map((event, eventIndex) => {
            const isActiveEvent = activeEra === era && activeEventIndex === eventIndex

            return (
                <motion.div
                    key={`${era.era}-${event.year}`}
                    className={`${styles.timelineEvent} ${isActiveEvent ? styles.activeEvent : ""}`}
                    onClick={() => onEventClick(eraIndex, eventIndex)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div
                        className={styles.eventDot}
                        style={{ backgroundColor: isActiveEvent ? "#F46B59" : "#ffffff" }}
                    />
                    {isActiveEvent && <div className={styles.eventIndicator} />}
                </motion.div>
            )
        })
    }

    return (
        <div className={styles.timelineBar} ref={timelineRef}>
            <div
                className={styles.timelineConnector}
                style={{ height: `${timelineRef.current?.scrollHeight || 0}px` }}
            />
            {timelineEras.map((era, eraIndex) => (
                <div key={era.era} className={styles.eraGroup}>
                    <div
                        className={`${styles.timelineConnector} ${era === activeEra ? styles.activeEraConnector : ""}`}
                    />
                    {renderEraEvents(era, eraIndex)}
                </div>
            ))}
        </div>
    )
}

export default TimelineBar
