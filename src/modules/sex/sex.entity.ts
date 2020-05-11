import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, } from "typeorm";

@Entity('sexes')
export class Sex {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
    nameSex: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
