import "server-only"
import { PagePhotoEntity } from "./PagePhoto.entity"
import { TopicEntity } from "./Topic.entity"
import { PageRelatedEntity } from "./PageRelated.entity"
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import type { Relation } from "typeorm"

@Entity("pages")
export class PageEntity {
    @PrimaryColumn({ type: "int4" })
    id!: number

    @Column({ type: "varchar", nullable: true })
    path!: string

    @Column({
        name: "galleryType",
        type: "enum",
        enum: ["gallery", "mosaic", "carousel"],
        nullable: true,
    })
    galleryType?: "gallery" | "mosaic" | "carousel"

    @Column({
        name: "heroPhoto",
        nullable: true,
    })
    heroPhoto?: string

    @Column({
        name: "heroFocus",
        nullable: true,
    })
    heroFocus?: string

    @Column({
        name: "blockOrder",
        type: "json",
        default: "[]",
    })
    blockOrder!: any[]

    @Column({ type: "varchar", nullable: true })
    thumbnail?: string

    @Column({
        name: "isLive",
        default: false,
    })
    isLive!: boolean

    @OneToMany(() => PagePhotoEntity, (photo) => photo.page)
    photos!: Relation<PagePhotoEntity>[]

    @OneToMany(() => TopicEntity, (topic) => topic.page)
    topics!: Relation<TopicEntity>[]

    @OneToMany(() => PageRelatedEntity, (related) => related.page)
    relatedPages!: Relation<PageRelatedEntity>[]
}
