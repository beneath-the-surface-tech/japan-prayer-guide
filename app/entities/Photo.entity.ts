import "server-only"
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import type { Relation } from "typeorm"
import { PagePhotoEntity } from "./PagePhoto.entity"

@Entity("photos")
export class PhotoEntity {
    @PrimaryColumn({ type: "int4" })
    id!: number

    @Column({ type: "varchar", nullable: true })
    image?: string

    @Column({ type: "text", nullable: true })
    image_name?: string

    @Column({ type: "text", nullable: true })
    image_id?: string

    @Column({ type: "text", nullable: true })
    en?: string

    @Column({ type: "text", nullable: true })
    ja?: string

    @Column({ type: "varchar", nullable: true })
    alt?: string

    @OneToMany(() => PagePhotoEntity, (photo) => photo.photo)
    pages!: Relation<PagePhotoEntity>[]
}
