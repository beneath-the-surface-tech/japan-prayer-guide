import { Box } from "@mui/material"
import { useState } from "react"
import { Button, Spinner } from "react-bootstrap"

export const ClearCacheButton = () => {
    const [isLoading, setIsLoading] = useState(false)
    const onClick = () => {
        setIsLoading(true)
        fetch("/api/revalidate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tags: ["translations", "pages", "pages-locales"],
            }),
        }).finally(() => {
            setIsLoading(false)
        })
    }
    return (
        <Box position="fixed" bottom={16} right={16} zIndex={1000}>
            <Button onClick={onClick}>
                Clear Cache
                {isLoading && (
                    <Box display="inline-block" pl={1}>
                        <Spinner animation="border" size="sm" />
                    </Box>
                )}
            </Button>
        </Box>
    )
}
