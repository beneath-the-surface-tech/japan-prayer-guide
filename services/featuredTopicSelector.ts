import schedule from "../public/featured-topics-cycle.json"

const getFeaturedTopic = (topics: string[], today = new Date()): string => {
    if (topics.length === 0) {
        throw new Error("The featured topic schedule is empty")
    }

    const monthsSinceStart = (today.getUTCFullYear() - 2026) * 12 + today.getUTCMonth() - 11
    const index = ((monthsSinceStart % topics.length) + topics.length) % topics.length
    return topics[index]
}

const getSchedule = (): string[] => schedule

export { getFeaturedTopic, getSchedule }
