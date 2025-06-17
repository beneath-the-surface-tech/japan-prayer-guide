import Link from "next/link"

export function LinkFromJson({ href, children }: { href: string; children?: React.ReactNode }) {
    return (
        <Link className="fst-normal" target="_blank" rel="noopener noreferrer" href={href || ""}>
            {children}
        </Link>
    )
}
