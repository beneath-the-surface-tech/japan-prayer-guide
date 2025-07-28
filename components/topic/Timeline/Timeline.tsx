"use client"

import { Box } from "@mui/material"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { FC, useEffect, useRef, useState } from "react"
import { Container } from "react-bootstrap"
import { TimelineEra } from "../../../pages/topics/[topicPage]"
import EraEvents from "./EraEvents"
import EventContent from "./EventContent"
import StickyEraDescription from "./StickyEraDescription"
import styles from "./Timeline.module.scss"
import { TimelineProvider, useTimelineContext } from "./TimelineContext"
import TimelineEventContent from "./TimelineEventContent"

interface TimelineProps {
    timelineEras: TimelineEra[]
}

const Timeline: FC = () => {
    const {
        timelineEras,
        eventGaps,
        activeEra,
        activeEvent,
        isLastEvent,
        allEvents,
        activeEventIndex,
        setActiveEvent,
        setActiveEra,
        setActiveEventIndex,
        setActiveEraIndex,
    } = useTimelineContext()
    const timelineRef = useRef<HTMLDivElement>(null!)
    const stickyRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const timelineContainerRef = useRef<HTMLDivElement>(null!)
    const timelineBarRef = useRef<HTMLDivElement>(null)
    const scrollDirectionRef = useRef<"up" | "down">("down")
    const lastScrollPositionRef = useRef<number>(0)
    const [isTabletMobile, setIsTabletMobile] = useState(false)
    const { scrollY } = useScroll({ offset: ["start start", "end end"] })

    useMotionValueEvent(scrollY, "change", (latest) => {
        const timelineEventContent = document.querySelectorAll<HTMLDivElement>(".timeline-event-content")

        timelineEventContent.forEach((ev) => {
            const eventTop = ev.offsetTop
            const eventId = parseInt(ev.dataset.eventId as string)
            const event = allEvents.find((event) => event.id === eventId)
            const era = timelineEras.find((era) => era.events?.some((event) => event.id === eventId))

            if (latest - window.innerHeight >= eventTop - 100) {
                if (eventId && event && era) {
                    if (eventId !== currentEventIdRef.current) {
                        currentEventIdRef.current = eventId
                        setActiveEvent(event)
                        setActiveEra(era)
                        setActiveEraIndex(timelineEras.findIndex((era) => era.era === era.era))
                        setActiveEventIndex(era.events?.findIndex((event) => event.id === eventId) || 0)
                    }
                }

                return
            }
        })
    })

    const colors = {
        darkest: "#0D1E57",
        darker: "#253E87",
        neutral: "#2E4FAE",
        lighter: "#78ABF8",
        lightest: "#AACBFA",
    }

    const textColors = {
        darkest: "#ffffff",
        darker: "#ffffff",
        neutral: "#ffffff",
        lighter: "#000000",
        lightest: "#000000",
    }

    const backgroundColor = colors[activeEvent.bgVariant as keyof typeof colors]
    const textColor = textColors[activeEvent.bgVariant as keyof typeof textColors]
    const currentEventIdRef = useRef<number>(0)

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            if (scrollY > lastScrollPositionRef.current) {
                scrollDirectionRef.current = "up"
            } else {
                scrollDirectionRef.current = "down"
            }
            lastScrollPositionRef.current = scrollY
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    useEffect(() => {
        setIsTabletMobile(window.innerWidth <= 1199)

        const handleResize = () => {
            setIsTabletMobile(window.innerWidth <= 1199)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowUp") {
                const prevEventIndex = allEvents.findIndex((event) => event.id === activeEvent.id) - 1
                const prevEvent = allEvents[prevEventIndex]

                if (prevEvent) {
                    window.requestAnimationFrame(() => {
                        const target = window.document.querySelector<HTMLDivElement>(
                            `div[data-event-id="${prevEvent.id}"]`,
                        )
                        if (target) {
                            window.scrollTo({
                                top: target.offsetTop + target.offsetHeight + 100,
                                behavior: "instant",
                            })
                        }
                    })
                }
            } else if (event.key === "ArrowDown") {
                const nextEventIndex = allEvents.findIndex((event) => event.id === activeEvent.id) + 1
                const nextEvent = allEvents[nextEventIndex]

                if (nextEvent) {
                    window.requestAnimationFrame(() => {
                        const target = window.document.querySelector<HTMLDivElement>(
                            `div[data-event-id="${nextEvent.id}"]`,
                        )
                        if (target) {
                            window.scrollTo({
                                top: target.offsetTop + target.offsetHeight + 100,
                                behavior: "instant",
                            })
                        }
                    })
                }
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [activeEvent.id, activeEventIndex, allEvents])

    return (
        <>
            <Box height="40dvh" className={`${styles.timelineGradient}`} width="100%" pt={20}>
                <Container>
                    <p className="quote text-primary-blue text-center" style={{ fontSize: "24px" }}>
                        <strong>Timeline of Christianity in Japan</strong>
                    </p>
                    <p className="text-left" style={{ fontSize: "1.125rem" }}>
                        We&apos;ve created this timeline to highlight some key events in the history of Christianity in
                        Japan, with an emphasis on missionary history.
                    </p>

                    <p className="text-left" style={{ fontSize: "1.125rem" }}>
                        It has been almost 500 years since the name of Jesus was first proclaimed in Japan. Since then,
                        the Japanese church has persevered through long periods of persecution and hardship. Today, less
                        than one percent of Japan&apos;s population is Christian. We long for a breakthrough of
                        God&apos;s Word and his Spirit across Japan! Will you join us in prayer?
                    </p>
                </Container>
            </Box>

            <Container fluid className={styles.timeline} ref={timelineContainerRef}>
                <motion.div
                    animate={{ backgroundColor: backgroundColor }}
                    transition={{ duration: 0.5 }}
                    className={styles.timelineBackgroundContainer}
                >
                    <motion.div
                        className={styles.timelineBackground}
                        style={{
                            backgroundImage: `url(${activeEvent.photos?.[activeEvent.photos.length - 1]?.src})`,
                        }}
                        animate={{
                            backgroundColor: backgroundColor,
                            backgroundImage: `url(${activeEvent.photos?.[activeEvent.photos.length - 1]?.src})`,
                        }}
                        transition={{ duration: 0.5 }}
                    ></motion.div>
                </motion.div>

                <Container className={styles.timelineWrapper}>
                    <Box flexDirection={["row"]} display={["flex"]}>
                        <Box
                            flexDirection="column"
                            alignItems="flex-end"
                            width="300px"
                            display={isTabletMobile ? "none" : "flex"}
                            flexShrink={0}
                        >
                            {/* Sticky Era Description */}
                            <StickyEraDescription
                                era={activeEra}
                                textColor={textColor}
                                scrollDirection={scrollDirectionRef.current}
                                stickyRef={stickyRef}
                            />
                        </Box>

                        {/* Timeline */}
                        <Box
                            className={`${styles.timelineBarContainer} ${styles.timelineBarDesktop}`}
                            ref={timelineBarRef}
                        >
                            <div className={styles.timelineBar} ref={timelineRef}>
                                <Box
                                    position="absolute"
                                    height={`${timelineRef.current?.scrollHeight}px`}
                                    width="3px"
                                    zIndex={2}
                                />
                                {timelineEras.map((era) => (
                                    <div key={era.era} className={styles.eraGroup}>
                                        <div
                                            className={`${styles.timelineConnector} ${
                                                era === activeEra ? styles.activeEraConnector : ""
                                            }`}
                                        />
                                        <EraEvents
                                            era={era}
                                            activeEra={activeEra}
                                            activeEventIndex={activeEventIndex}
                                            timelineBarRef={timelineRef}
                                            eventGaps={eventGaps}
                                        />
                                    </div>
                                ))}
                                <Box className={styles.eraGroup} height="70dvh" flexShrink={0}>
                                    <div className={styles.timelineConnector}>&nbsp;</div>
                                </Box>
                            </div>
                        </Box>

                        {/* Content Area */}
                        <Box flexGrow={1} maxWidth="1400px">
                            <Box className={`${styles.contentArea} ${isLastEvent ? styles.lastEvent : ""}`}>
                                {isTabletMobile && (
                                    <StickyEraDescription
                                        era={activeEra}
                                        textColor={textColor}
                                        scrollDirection={scrollDirectionRef.current}
                                        stickyRef={stickyRef}
                                    />
                                )}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    key={activeEvent.id}
                                    transition={{ duration: 0.5, ease: ["easeIn", "easeOut"] }}
                                    // key={activeEvent.id}
                                    ref={contentRef}
                                >
                                    <EventContent
                                        activeEvent={activeEvent}
                                        textColor={textColor}
                                        isLast={isLastEvent}
                                    />
                                </motion.div>
                            </Box>

                            <Box position="sticky" top={0}>
                                <Box height={["150dvh", "150dvh", "150dvh", "60dvh"]} />
                                {timelineEras.flatMap(
                                    (era) =>
                                        era.events?.map((event) => (
                                            <TimelineEventContent key={event.id} event={event} />
                                        )),
                                )}
                                {/* <Box height="100dvh" /> */}
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Container>
        </>
    )
}

export const TimelineWithContext: FC<TimelineProps> = ({ timelineEras }) => {
    return (
        <TimelineProvider timelineEras={timelineEras}>
            <Timeline />
        </TimelineProvider>
    )
}

export default TimelineWithContext
