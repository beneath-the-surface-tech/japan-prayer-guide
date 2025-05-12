"use client"

import { Box } from "@mui/material"
import { motion } from "motion/react"
import { FC, useEffect, useMemo, useRef, useState } from "react"
import { Col, Container } from "react-bootstrap"
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

    const colors = {
        darkest: "#131a35",
        darker: "#343F63",
        neutral: "#727C96",
        lighter: "#9BA2B0",
        lightest: "#DFEEFF",
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

    const intersectionObserver = useMemo(() => {
        if (typeof window === "undefined") {
            return null
        }
        const observer = new IntersectionObserver(
            (entries) => {
                const targetEntry = entries.find((entry) => entry.intersectionRatio > 0.8)
                const target = targetEntry?.target as HTMLDivElement

                if (target) {
                    const eventId = parseInt(target.dataset.eventId as string)
                    const event = allEvents.find((event) => event.id === eventId)
                    const era = timelineEras.find((era) => era.events?.some((event) => event.id === eventId))

                    if (event && era) {
                        setActiveEvent(event)
                        setActiveEra(era)
                        setActiveEraIndex(timelineEras.findIndex((era) => era.era === era.era))
                        setActiveEventIndex(era.events?.findIndex((event) => event.id === eventId) || 0)
                    }
                }
            },
            { threshold: [0, 0.5, 0.8, 0.9, 1] },
        )

        return observer
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        setIsTabletMobile(window.innerWidth <= 1280)

        const handleResize = () => {
            setIsTabletMobile(window.innerWidth <= 1280)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <Container fluid className={styles.timeline} ref={timelineContainerRef}>
            <motion.div
                animate={{ backgroundColor: backgroundColor }}
                transition={{ duration: 0.5 }}
                className={styles.timelineBackgroundContainer}
            >
                <motion.div
                    className={styles.timelineBackground}
                    style={{ backgroundImage: `url(${activeEvent.photos?.[activeEvent.photos.length - 1]?.src})` }}
                    animate={{ backgroundColor: backgroundColor }}
                    transition={{ duration: 0.5 }}
                ></motion.div>
            </motion.div>

            <div className={styles.timelineWrapper}>
                {isTabletMobile ? (
                    <Box flexDirection="row" display={["flex", "flex", "flex", "none"]}>
                        {/* Timeline */}
                        <Col
                            md={1}
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
                                <Box className={styles.eraGroup} height="70dvh" flexShrink={0} />
                            </div>
                        </Col>

                        <Box display="flex" flexDirection="column">
                            {/* Content Area */}
                            <Box flexGrow={1} maxWidth="1400px">
                                <Box className={styles.contentArea}>
                                    {/* Sticky Era Description */}
                                    <StickyEraDescription
                                        era={activeEra}
                                        textColor={textColor}
                                        scrollDirection={scrollDirectionRef.current}
                                        stickyRef={stickyRef}
                                    />

                                    <motion.div
                                        initial={{ opacity: 0, y: scrollDirectionRef.current === "up" ? 400 : -400 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ type: "spring", bounce: 0.25 }}
                                        key={activeEvent.id}
                                        ref={contentRef}
                                    >
                                        <EventContent activeEvent={activeEvent} textColor={textColor} />
                                    </motion.div>
                                </Box>
                                <Box position="relative" marginTop="calc(270px - 80dvh)">
                                    {timelineEras.flatMap(
                                        (era) =>
                                            era.events?.map((event) => (
                                                <TimelineEventContent
                                                    key={event.id}
                                                    event={event}
                                                    intersectionObserver={intersectionObserver}
                                                />
                                            )),
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <Box flexDirection={["column", "column", "row"]} display={["none", "none", "none", "flex"]}>
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-end"
                            width={["100%", "100%", "300px", "450px"]}
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
                        <Col
                            md={1}
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
                                <Box className={styles.eraGroup} height="70dvh" flexShrink={0} />
                            </div>
                        </Col>

                        {/* Content Area */}
                        <Box flexGrow={1} maxWidth="1400px">
                            <motion.div
                                initial={{ opacity: 0, y: scrollDirectionRef.current === "up" ? 400 : -400 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={styles.contentArea}
                                transition={{ type: "spring", bounce: 0.25 }}
                                key={activeEvent.id}
                                ref={contentRef}
                            >
                                <EventContent activeEvent={activeEvent} textColor={textColor} />
                            </motion.div>
                            <Box position="relative" marginTop="calc(270px - 80dvh)">
                                {timelineEras.flatMap(
                                    (era) =>
                                        era.events?.map((event) => (
                                            <TimelineEventContent
                                                key={event.id}
                                                event={event}
                                                intersectionObserver={intersectionObserver}
                                            />
                                        )),
                                )}
                            </Box>
                            <Box height="50dvh" />
                        </Box>
                    </Box>
                )}
            </div>
        </Container>
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
