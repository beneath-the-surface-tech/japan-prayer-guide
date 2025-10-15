import { MotionValue } from "motion/dist/react"
import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react"
import { TimelineEra, TimelineEvent } from "../../../pages/topics/[topicPage]"
import { useOneYearPixels } from "./hooks/useOneYearPixels"

interface TimelineContextType {
    timelineEras: TimelineEra[]
    allEvents: TimelineEvent[]
    eventGaps: Map<number, number>
    activeEra: TimelineEra
    activeEvent: TimelineEvent
    previousEvent: TimelineEvent | null
    activeEraIndex: number
    activeEventIndex: number
    totalEvents: number
    eventProgressMap: Record<number, MotionValue<number>>
    isLastEvent: boolean
    lastEvent: TimelineEvent
    setEventProgressMap: Dispatch<SetStateAction<Record<number, MotionValue<number>>>>
    nextEvent: (event: TimelineEvent) => TimelineEvent | null
    setActiveEra: (era: TimelineEra) => void
    setActiveEvent: (event: TimelineEvent) => void
    setActiveEraIndex: (index: number) => void
    setActiveEventIndex: (index: number) => void
    updateActiveEvent: (eraIndex: number, eventIndex: number) => void
}

const TimelineContext = createContext<TimelineContextType | undefined>(undefined)

interface TimelineProviderProps {
    children: ReactNode
    timelineEras: TimelineEra[]
}

export const TimelineProvider: React.FC<TimelineProviderProps> = ({ children, timelineEras }) => {
    const [activeEra, setActiveEra] = useState<TimelineEra | null>(timelineEras.length > 0 ? timelineEras[0] : null)
    const [previousEvent, setPreviousEvent] = useState<TimelineEvent | null>(null)
    const [activeEvent, setActiveEvent] = useState<TimelineEvent | null>(
        timelineEras.length > 0 && timelineEras[0].events && timelineEras[0].events.length > 0
            ? timelineEras[0].events[0]
            : null,
    )
    const [activeEraIndex, setActiveEraIndex] = useState(0)
    const [activeEventIndex, setActiveEventIndex] = useState(0)
    const [eventProgressMap, setEventProgressMap] = useState<Record<number, MotionValue<number>>>({})
    const oneYearPixels = useOneYearPixels()

    const allEvents = useMemo(() => {
        return timelineEras.flatMap((era) => era.events || [])
    }, [timelineEras])
    const totalEvents = allEvents.length
    const eventGaps = useMemo(() => {
        const gaps = new Map<number, number>()
        allEvents.forEach((event, index) => {
            if (index < allEvents.length - 1) {
                const nextEvent = allEvents[index + 1]
                const gap = parseInt(String(nextEvent.year)) - parseInt(String(event.year))
                const gapInPixels = gap * oneYearPixels

                if (Number.isNaN(gapInPixels) || gapInPixels < 30) {
                    gaps.set(event.id, 30)
                } else {
                    gaps.set(event.id, gapInPixels)
                }
            }
        })
        return gaps
    }, [allEvents, oneYearPixels])

    const updateActiveEvent = (eraIndex: number, eventIndex: number) => {
        if (eraIndex >= 0 && eraIndex < timelineEras.length) {
            const era = timelineEras[eraIndex]
            setActiveEra(era)
            setActiveEraIndex(eraIndex)

            if (era.events && eventIndex >= 0 && eventIndex < era.events.length) {
                setPreviousEvent(activeEvent)
                setActiveEvent(era.events[eventIndex])
                setActiveEventIndex(eventIndex)
            }
        }
    }

    const nextEvent = useCallback(
        (event: TimelineEvent) => {
            if (event) {
                const nextEventIndex = allEvents.findIndex((e) => e.id === event.id) + 1
                return allEvents[nextEventIndex]
            }
            return null
        },
        [allEvents],
    )

    const setActiveEventCb = useCallback(
        (event: TimelineEvent) => {
            if (event) {
                setPreviousEvent(activeEvent)
                setActiveEvent(event)
            }
        },
        [activeEvent],
    )

    const lastEvent = useMemo(() => {
        return allEvents[allEvents.length - 1]
    }, [allEvents])

    const isLastEvent = useMemo(() => {
        return activeEvent?.id === lastEvent.id
    }, [activeEvent?.id, lastEvent.id])

    return activeEra && activeEvent ? (
        <TimelineContext.Provider
            value={{
                timelineEras,
                previousEvent,
                allEvents,
                totalEvents,
                eventGaps,
                nextEvent,
                activeEra,
                activeEvent,
                lastEvent,
                activeEraIndex,
                activeEventIndex,
                setActiveEra,
                setActiveEvent: setActiveEventCb,
                setActiveEraIndex,
                setActiveEventIndex,
                updateActiveEvent,
                eventProgressMap,
                setEventProgressMap,
                isLastEvent,
            }}
        >
            {children}
        </TimelineContext.Provider>
    ) : null
}

export const useTimelineContext = (): TimelineContextType => {
    const context = useContext(TimelineContext)
    if (context === undefined) {
        throw new Error("useTimelineContext must be used within a TimelineProvider")
    }
    return context
}
