import { readFileSync } from "fs"
import { resolve } from "path"

export const getLocalLocale = (localePath: string) => {
    const filePath = resolve(process.cwd(), `./public/locales/${localePath}`)
    const fileData = JSON.parse(readFileSync(filePath, "utf-8"))
    return fileData
}
