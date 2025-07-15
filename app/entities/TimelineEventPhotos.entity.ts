import * as typeorm from "typeorm"
import { TimelineEvents } from "./TimelineEvents.entity"
import { PhotoEntity } from "./Photo.entity"

@typeorm.Entity("timeline_event_photos")
export class TimelineEventPhotos {
    @typeorm.PrimaryGeneratedColumn()
    id!: number

    @typeorm.Column({ name: "order", type: "integer", default: 0 })
    order!: number

    @typeorm.ManyToOne(() => PhotoEntity)
    @typeorm.JoinColumn({ name: "photo_id" })
    photo?: typeorm.Relation<PhotoEntity>

    @typeorm.ManyToOne(() => TimelineEvents, (event: TimelineEvents) => event.photos)
    @typeorm.JoinColumn({ name: "timeline_event_id" })
    timeline_event?: typeorm.Relation<TimelineEvents>
}
