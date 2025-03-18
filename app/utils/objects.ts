export const mapById = <T extends { id: string | number }>(array: T[]): Record<string | number, T> => {
    return array.reduce(
        (acc, item) => {
            acc[item.id] = item
            return acc
        },
        {} as Record<string | number, T>,
    )
}
