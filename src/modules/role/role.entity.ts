import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type : 'varchar', length: 20, nullable: false })
    nameRole: string;

    @Column({ type : 'text', nullable: false })
    descriptionRole: string;

    @ManyToMany(type => User, user => user.roles)
    @JoinColumn()
    users: User[];

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', name: 'updated_at'})
    updatedAt: Date;


}
