import { useMediaQuery } from "@mui/material"

export const useOneYearPixels = () => {
    const xs = useMediaQuery("(max-width: 476px)")
    const sm = useMediaQuery("(max-width: 952px)")
    const md = useMediaQuery("(max-width: 1428px)")
    const lg = useMediaQuery("(min-width: 1904px)")

    if (xs) return 1
    if (sm) return 2
    if (md) return 3
    if (lg) return 4
    return 4
}
