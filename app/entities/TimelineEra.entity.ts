import * as typeorm from "typeorm"
import { TimelineEvents } from "./TimelineEvents.entity"
import { PageEntity } from "./Page.entity"

@typeorm.Entity("timeline_eras")
export class TimelineEra {
    @typeorm.PrimaryGeneratedColumn()
    id!: number

    @typeorm.Column({ name: "title_en", type: "text", nullable: true })
    title_en?: string

    @typeorm.Column({ type: "text", nullable: true })
    era?: string

    @typeorm.Column({ name: "title_ja", type: "text", nullable: true })
    title_ja?: string

    @typeorm.ManyToOne(() => PageEntity, (page: PageEntity) => page.timelineEras)
    @typeorm.JoinColumn({ name: "page_id" })
    page?: typeorm.Relation<PageEntity>

    @typeorm.OneToMany(() => TimelineEvents, (event: TimelineEvents) => event.timeline_era)
    events?: typeorm.Relation<TimelineEvents>[]
}
