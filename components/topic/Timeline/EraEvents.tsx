import { motion, motionValue, useTransform } from "motion/react"
import React, { FC, useEffect, useRef } from "react"
import { TimelineEra } from "../../../pages/topics/[topicPage]"
import styles from "./Timeline.module.scss"
import { useTimelineContext } from "./TimelineContext"

export interface EraEventsProps {
    era: TimelineEra
    activeEra: TimelineEra
    activeEventIndex: number
    timelineBarRef: React.RefObject<HTMLDivElement>
    eventGaps: Map<number, number>
}

// Extracted component for individual event rendering
const EventItem: FC<{
    event: any
    eventIndex: number
    era: TimelineEra
    activeEra: TimelineEra
    activeEventIndex: number
    eventGaps: Map<number, number>
    eventRefs: Record<number, HTMLDivElement>
}> = ({ event, eventIndex, era, activeEra, activeEventIndex, eventGaps, eventRefs }) => {
    const { eventProgressMap, nextEvent } = useTimelineContext()
    const isActiveEvent = activeEra === era && activeEventIndex === eventIndex
    const eventRef = useRef<HTMLDivElement>(null)
    const next = nextEvent(event)
    const height = useTransform(eventProgressMap[next?.id || 0] || motionValue(0), [0, 1], ["0%", "100%"])

    if (eventRef.current) {
        eventRefs[event.id] = eventRef.current
    }

    return (
        <div
            key={`${era.era}-${event.year}`}
            ref={eventRef}
            className={`${styles.timelineEvent} ${isActiveEvent ? styles.activeEvent : ""}`}
            style={{
                height: `${eventGaps.get(event.id) || 0}px`,
            }}
        >
            <div className={styles.eventDot} style={{ backgroundColor: isActiveEvent ? "#F46B59" : "#A6A6A6" }} />
            <motion.div
                style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    marginLeft: "-1.5px",
                    width: "3px",
                    backgroundColor: "rgba(0,0,0,0.4)",
                    height,
                    zIndex: 2,
                }}
                transition={{ type: "spring", bounce: 0.25 }}
            />
            {isActiveEvent && <div className={styles.eventIndicator} />}
        </div>
    )
}

const EraEvents: FC<EraEventsProps> = ({ era, activeEra, activeEventIndex, timelineBarRef, eventGaps }) => {
    const { activeEvent } = useTimelineContext()
    const eventRefs = useRef<Record<number, HTMLDivElement>>({})

    useEffect(() => {
        const timelineContainerRect = timelineBarRef.current?.getBoundingClientRect()
        const rect = eventRefs.current[activeEvent?.id || 0]?.getBoundingClientRect()

        if (activeEvent && timelineContainerRect && rect) {
            const yOffset = rect?.top - timelineContainerRect?.top
            const translateY = yOffset > 100 ? yOffset - 50 : 0
            timelineBarRef.current && (timelineBarRef.current.style.transform = `translateY(-${translateY}px)`)
        }
    }, [activeEvent, timelineBarRef])

    return (
        <>
            {era.events?.map((event, eventIndex) => (
                <EventItem
                    key={`${era.era}-${event.year}`}
                    event={event}
                    eventIndex={eventIndex}
                    era={era}
                    activeEra={activeEra}
                    activeEventIndex={activeEventIndex}
                    eventGaps={eventGaps}
                    eventRefs={eventRefs.current}
                />
            ))}
        </>
    )
}

export default EraEvents
