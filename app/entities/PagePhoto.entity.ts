import "server-only"
import { Column, JoinColumn, ManyToOne, Entity, PrimaryColumn } from "typeorm"
import type { Relation } from "typeorm"
import { PageEntity } from "./Page.entity"
import { PhotoEntity } from "./Photo.entity"

@Entity("pages_photos")
export class PagePhotoEntity {
    @PrimaryColumn({ type: "int4" })
    id!: number

    @Column({ type: "int4", default: 0 })
    order!: number

    @Column({ type: "varchar" })
    type!: "main" | "uncropped"

    @ManyToOne(() => PageEntity, (page) => page.photos)
    @JoinColumn({ name: "page_id" })
    page!: Relation<PageEntity>

    @ManyToOne(() => PhotoEntity, (photo) => photo.pages)
    @JoinColumn({ name: "photo_id" })
    photo!: Relation<PhotoEntity>
}
