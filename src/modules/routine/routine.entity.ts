import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Sex } from "../sex/sex.entity";

@Entity('routines')
export class Routine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 25, nullable: false })
    nameRoutine: string;

    @Column({ type: 'varchar', length: 25, nullable: false })
    descriptionRoutine: string;

    @ManyToOne(type => Sex)
    sex: Sex;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;


}
