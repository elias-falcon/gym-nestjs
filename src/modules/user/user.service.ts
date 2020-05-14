import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { StateUserEntityRepository } from '../state-user-entity/state-user-entity.respository';
import { StateUserEntity } from '../state-user-entity/state-user-entity.entity';
import { User } from './user.entity';
import { RoleRepository } from '../role/role.repository';
import { status } from '../../shared/entity-status.enum'
import { Role } from '../role/role.entity';
import { RoleType } from '../role/roletype.enum';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
        @InjectRepository(StateUserEntityRepository)
        private readonly _stateUserEntityRepository: StateUserEntityRepository,
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository,
    ){}

    async get(id: number): Promise<User>{
        if(!id){
            throw new BadRequestException('id must be sent')
        }

        const stateUserActive: StateUserEntity = await this._stateUserEntityRepository.findOne({where: { nameStateUser: status.ACTIVE }});

        const user: User = await this._userRepository.findOne(id, {
            where: { stateUser: stateUserActive }});

        if (!user){
            throw new NotFoundException();
        }

        return user;
    }

    async getAll(): Promise<User[]>{
        const stateUserActive: StateUserEntity = await this._stateUserEntityRepository.findOne({where: { nameStateUser: status.ACTIVE }});

        const users: User[] = await this._userRepository.find({
            where: { stateUser: stateUserActive }});

        return users;
    }

    async create(user: User): Promise<User>{
        const roleDefault: Role = await this._roleRepository.findOne({
            where: {nameRole: RoleType.CUSTOMER}
        })
        const savedUser: User = user;
        savedUser.roles.push(roleDefault);
        await this._userRepository.save(user);
        return savedUser;
    }

    async update (id: number, user:User): Promise<void> {
        await this._userRepository.update(id, user);
    }

    async delete(id: number): Promise<void>{
        const stateUserActive: StateUserEntity = await this._stateUserEntityRepository.findOne({where: { nameStateUser: status.ACTIVE }});
        const userExist = await this._userRepository.findOne(id, {
            where: {stateUser: stateUserActive }
        });

        if(!userExist){
            throw new NotFoundException();
        }

        const stateUserInactive: StateUserEntity = await this._stateUserEntityRepository.findOne({where: { nameStateUser: status.INACTIVE }});
        await this._userRepository.update(id, { stateUser: stateUserInactive });
    }

    async setRoleToUser(userId: number, roleId: number){
        const stateUserActive: StateUserEntity = await this._stateUserEntityRepository.findOne({where: { nameStateUser: status.ACTIVE }});
        const userExist = await this._userRepository.findOne(userId, {
            where: {stateUser: stateUserActive }
        });

        if(!userExist){
            throw new NotFoundException();
        }

        const roleExist = await this._roleRepository.findOne(roleId);

        if(!roleExist){
            throw new NotFoundException('Role does not exist');
        }

        userExist.roles.push(roleExist);
        await this._userRepository.save(userExist);
        return true;
    }
}
