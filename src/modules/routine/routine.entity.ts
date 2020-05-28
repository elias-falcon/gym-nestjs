import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany } from "typeorm";
import { Exercise } from "../exercise/exercise.entity";

@Entity('routines')
export class Routine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 25, nullable: false })
    nameRoutine: string;

    @Column({ type: 'varchar', length: 25, nullable: false })
    descriptionRoutine: string;

    @Column({ type: 'varchar', nullable: false })
    sexMale: boolean;

    @OneToMany(type => Exercise, exercise => exercise.routine)
    excercises: Exercise[];

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;

}
