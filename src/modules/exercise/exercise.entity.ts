import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Routine } from "../routine/routine.entity";

@Entity('exercises')
export class Exercise {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type : 'varchar', length: 20, nullable: false })
    nameExcercise: string;

    @Column({ type : 'text', nullable: false })
    descriptionExcercise: string;

    @Column({ type : 'text', nullable: false })
    linkToVideo: string;

    @Column({ type : 'text', nullable: false })
    gif: string;

    @ManyToOne(type => Routine)
    routine: Routine;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', name: 'updated_at'})
    updatedAt: Date;

}
