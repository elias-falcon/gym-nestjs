import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('states_user_entity')
export class StateUserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', unique: true, nullable: false })
    nameStateUser: string;

    @Column({ type : 'text', nullable: false })
    descriptionStateUserEntity: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
