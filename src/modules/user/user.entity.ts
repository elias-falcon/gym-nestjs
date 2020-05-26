import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Role } from "../role/role.entity";
import { StateUserEntity } from "../state-user-entity/state-user-entity.entity";
import { Customer } from "../customer/customer.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', unique: true, length: 25, nullable: false})
    username: string;

    @Column({type: 'varchar', nullable: false})
    password: string;
    
    @Column({type: 'varchar', unique: true, nullable: true})
    email: string;

    @ManyToOne(type => StateUserEntity)
    @JoinColumn()
    stateUser: StateUserEntity;

    @ManyToMany(type => Role, role => role.users, { eager: true})
    @JoinTable( {name: 'user_roles'})
    roles: Role[];

    @OneToOne(type => Customer)
    @JoinColumn()
    customer: Customer;

    constructor(){}

   
}
