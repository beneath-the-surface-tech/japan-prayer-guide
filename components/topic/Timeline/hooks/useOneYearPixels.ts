import { useMediaQuery } from "@mui/material"

export const useOneYearPixels = () => {
    const xs = useMediaQuery("(max-width: 476px)")
    const sm = useMediaQuery("(max-width: 952px)")
    const md = useMediaQuery("(max-width: 1428px)")
    const lg = useMediaQuery("(min-width: 1904px)")

    if (xs) return 0.7
    if (sm) return 0.7
    if (md) return 0.7
    if (lg) return 0.7
    return 0.7
}
