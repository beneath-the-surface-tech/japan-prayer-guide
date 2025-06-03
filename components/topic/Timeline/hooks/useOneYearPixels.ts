import { useMediaQuery } from "@mui/material"

export const useOneYearPixels = () => {
    const xs = useMediaQuery("(max-width: 476px)")
    const sm = useMediaQuery("(max-width: 952px)")
    const md = useMediaQuery("(max-width: 1428px)")
    const lg = useMediaQuery("(min-width: 1904px)")

    if (xs) return 1
    if (sm) return 1
    if (md) return 1
    if (lg) return 1
    return 1
}
