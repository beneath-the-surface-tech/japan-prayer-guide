import "server-only"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import type { Relation } from "typeorm"
import { PageEntity } from "./Page.entity"

@Entity("topics")
export class TopicEntity {
    @PrimaryColumn({ type: "int4" })
    id!: number

    @Column({ type: "varchar", nullable: true })
    title!: string

    @Column({ type: "text", nullable: true })
    textBody!: string

    @Column({ type: "text", nullable: true })
    textBodyAsterisk!: string

    @Column({ type: "text", nullable: true })
    prayerSummary!: string

    @Column({ type: "json", default: "[]" })
    timeline!: any[]

    @Column({
        type: "json",
        default: { content: "", source: "" },
    })
    quote!: { content: string; source: string }

    @Column({
        type: "json",
        default: { mobile: "", desktop: "", tablet: "" },
    })
    infographic!: {
        mobile: string
        desktop: string
        tablet: string
    }

    @Column({
        type: "json",
        default: {
            infographicsUrl: "",
            pdfUrl: "",
            prayerPtsUrl: "",
            prayerVidUrl: "",
            photographyUrl: "",
            slidesUrl: "",
        },
    })
    downloads!: {
        infographicsUrl: string
        pdfUrl: string
        prayerPtsUrl: string
        prayerVidUrl: string
        photographyUrl: string
        slidesUrl: string
    }

    @Column({ type: "text", nullable: true })
    videoSrc?: string

    @Column({
        type: "enum",
        enum: ["en", "ja"],
        default: "en",
    })
    locale!: "en" | "ja"

    @ManyToOne(() => PageEntity, (page) => page.topics)
    @JoinColumn({ name: "page_id" })
    page!: Relation<PageEntity>
}
