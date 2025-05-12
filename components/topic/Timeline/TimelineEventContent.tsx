import { Box } from "@mui/material"
import { useScroll } from "motion/react"
import React, { RefObject, useCallback, useEffect, useRef } from "react"
import { TimelineEvent } from "../../../pages/topics/[topicPage]"
import { useTimelineContext } from "./TimelineContext"

export interface TimelineEventProps {
    event: TimelineEvent
    intersectionObserver: IntersectionObserver | null
}

const TimelineEventContent: React.FC<TimelineEventProps> = ({ event, intersectionObserver }) => {
    const { setEventProgressMap } = useTimelineContext()
    const boxRef = useRef<HTMLDivElement>()
    const { scrollYProgress } = useScroll({
        target: boxRef as RefObject<HTMLElement>,
        offset: ["start end", "end end"],
    })

    const refCallback = useCallback(
        (ref: HTMLDivElement) => {
            boxRef.current = ref
            if (ref) {
                intersectionObserver?.observe(ref)
            }
        },
        [intersectionObserver],
    )

    useEffect(() => {
        setEventProgressMap((prev) => {
            prev[event.id] = scrollYProgress
            return prev
        })
    }, [event.id, scrollYProgress, setEventProgressMap])

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            pb={4}
            height="calc(100dvh - 100px)"
            position="relative"
            ref={refCallback}
            data-event-id={event.id}
        />
    )
}

export default TimelineEventContent
