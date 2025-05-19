import Link from "next/link"

export function LinkFromJson({ href, children }: { href: string; children?: React.ReactNode }) {
    return (
        <Link className="fst-normal" href={href || ""}>
            {children}
        </Link>
    )
}
