import { BaseEntity, Generated, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Exclude, instanceToPlain } from "class-transformer";

export class Base extends BaseEntity {
    @Exclude({ toPlainOnly: true })
    @PrimaryGeneratedColumn()
    id: number;

    @Generated("uuid")
    @Column("uuid")
    uuid: string;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt: Date;

    @Exclude({ toPlainOnly: true })
    @DeleteDateColumn({ type: "timestamptz" })
    deletedAt: Date;

    async delete() {
        this.deletedAt = new Date();
        await this.save().catch((e) => {
            console.error("Could not delete registry", e);
            return e;
        });
    }

    toJSON() {
        return instanceToPlain(this);
    }
}
