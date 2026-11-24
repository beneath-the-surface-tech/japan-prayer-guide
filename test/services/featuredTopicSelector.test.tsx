import { getFeaturedTopic, getSchedule } from "../../services/featuredTopicSelector"

describe("featured topic selector", () => {
    const topics = ["first", "second", "third"]

    test("changes topics at the start of each UTC month", () => {
        expect(getFeaturedTopic(topics, new Date("2026-12-01T00:00:00Z"))).toBe("first")
        expect(getFeaturedTopic(topics, new Date("2026-12-31T23:59:59Z"))).toBe("first")
        expect(getFeaturedTopic(topics, new Date("2027-01-01T00:00:00Z"))).toBe("second")
    })

    test("wraps around before and after the start of the cycle", () => {
        expect(getFeaturedTopic(topics, new Date("2026-11-30T23:59:59Z"))).toBe("third")
        expect(getFeaturedTopic(topics, new Date("2027-03-01T00:00:00Z"))).toBe("first")
    })

    test("features all 30 scheduled topics once before repeating", () => {
        const schedule = getSchedule()
        expect(schedule).toHaveLength(30)
        expect(new Set(schedule).size).toBe(30)

        schedule.forEach((topic, index) => {
            expect(getFeaturedTopic(schedule, new Date(Date.UTC(2026, 11 + index, 1)))).toBe(topic)
        })
        expect(getFeaturedTopic(schedule, new Date("2029-06-01T00:00:00Z"))).toBe(schedule[0])
    })

    test("rejects an empty schedule", () => {
        expect(() => getFeaturedTopic([], new Date("2026-12-01T00:00:00Z"))).toThrow(
            "The featured topic schedule is empty",
        )
    })
})
