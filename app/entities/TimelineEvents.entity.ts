import * as typeorm from "typeorm"
import { TimelineEra } from "./TimelineEra.entity"
import { TimelineEventPhotos } from "./TimelineEventPhotos.entity"

enum GalleryTypeEnum {
    CAROUSEL = "carousel",
    GRID = "grid",
    SINGLE = "single",
}

enum BgVariantEnum {
    BRIGHTEST = "brightest",
    BRIGHTER = "brighter",
    BRIGHT = "bright",
    DARK = "dark",
    DARKER = "darker",
    DARKEST = "darkest",
}

@typeorm.Entity("timeline_events")
export class TimelineEvents {
    @typeorm.PrimaryGeneratedColumn()
    id!: number

    @typeorm.Column({ type: "text", nullable: true })
    year?: string

    @typeorm.Column({ type: "text", nullable: true })
    title?: string

    @typeorm.Column({ name: "order", type: "integer" })
    order!: number

    @typeorm.Column({ name: "text_body_en", type: "text", nullable: true })
    text_body_en?: string

    @typeorm.Column({ name: "galleryType", type: "enum", enum: GalleryTypeEnum, nullable: true })
    gallery_type?: GalleryTypeEnum

    @typeorm.Column({ name: "bgVariant", type: "enum", enum: BgVariantEnum, default: BgVariantEnum.BRIGHTEST })
    bg_variant!: BgVariantEnum

    @typeorm.Column({ name: "timeline_era_id", type: "integer", nullable: true })
    timeline_era_id?: number

    @typeorm.Column({ name: "text_body_ja", type: "text", nullable: true })
    text_body_ja?: string

    @typeorm.ManyToOne(() => TimelineEra, (era: TimelineEra) => era.events)
    @typeorm.JoinColumn({ name: "timeline_era_id" })
    timeline_era?: typeorm.Relation<TimelineEra>

    @typeorm.OneToMany(() => TimelineEventPhotos, (photo: TimelineEventPhotos) => photo.timeline_event)
    photos?: TimelineEventPhotos[]
}
