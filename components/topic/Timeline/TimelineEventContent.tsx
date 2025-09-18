import { Box } from "@mui/material"
import React from "react"
import { TimelineEvent } from "../../../pages/topics/[topicPage]"

export interface TimelineEventProps {
    event: TimelineEvent
    index: number
}

const TimelineEventContent: React.FC<TimelineEventProps> = ({ event, index }) => {
    return (
        <>
            {index === 0 && <Box height="70dvh" />}
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                pb="30px"
                height="calc(100dvh - 150px)"
                position="relative"
                className="timeline-event-content"
                data-event-id={event.id}
            />
        </>
    )
}

export default TimelineEventContent
