import { Box } from "@mui/material"
import React, { useCallback, useRef } from "react"
import { TimelineEvent } from "../../../pages/topics/[topicPage]"

export interface TimelineEventProps {
    event: TimelineEvent
    intersectionObserver: IntersectionObserver | null
}

const TimelineEventContent: React.FC<TimelineEventProps> = ({ event, intersectionObserver }) => {
    const boxRef = useRef<HTMLDivElement>()
    const refCallback = useCallback(
        (ref: HTMLDivElement) => {
            boxRef.current = ref
            if (ref) {
                intersectionObserver?.observe(ref)
            }
        },
        [intersectionObserver],
    )

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            pb="30px"
            height="calc(100dvh - 150px)"
            position="relative"
            ref={refCallback}
            data-event-id={event.id}
        />
    )
}

export default TimelineEventContent
