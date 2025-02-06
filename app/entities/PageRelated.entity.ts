import "server-only"
import { Entity, JoinColumn, ManyToOne, PrimaryColumn, RelationId } from "typeorm"
import type { Relation } from "typeorm"
import { PageEntity } from "./Page.entity"

@Entity("pages_related")
export class PageRelatedEntity {
    @PrimaryColumn({ type: "int4" })
    id!: number

    @ManyToOne(() => PageEntity, (page) => page.relatedPages)
    @JoinColumn({ name: "page_id" })
    page!: Relation<PageEntity>

    @ManyToOne(() => PageEntity)
    @JoinColumn({ name: "related_page_id" })
    relatedPage!: Relation<PageEntity>

    @RelationId((pageRelated: PageRelatedEntity) => pageRelated.relatedPage)
    relatedPageId!: number
}
