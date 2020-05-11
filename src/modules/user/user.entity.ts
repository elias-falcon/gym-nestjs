import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Role } from "../role/role.entity";
import { StateUserEntity } from "../state-user-entity/state-user-entity.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', unique: true, length: 25, nullable: false})
    username: string;

    @Column({type: 'varchar', nullable: false})
    password: string;

    @ManyToOne(type => StateUserEntity)
    stateUser: StateUserEntity;

    @ManyToMany(type => Role, role => role.users, { eager: true})
    @JoinTable( {name: 'user_roles'})
    roles: Role[];

    constructor(userAndPassword:string){
        this.username = userAndPassword;
        this.password = userAndPassword;
    }
}
