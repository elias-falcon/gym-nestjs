import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { StateUserEntityRepository } from '../state-user-entity/state-user-entity.respository';
import { StateUserEntity } from '../state-user-entity/state-user-entity.entity';
import { User } from './user.entity';
import { RoleRepository } from '../role/role.repository';

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

        const stateUserActive: StateUserEntity = await this._stateUserEntityRepository.findOne({where: { nameStateUser: 'ACTIVE' }});

        const user: User = await this._userRepository.findOne(id, {
            where: { stateUser: stateUserActive }});

        if (!user){
            throw new NotFoundException();
        }

        return user;
    }

    async getAll(): Promise<User[]>{
        const stateUserActive: StateUserEntity = await this._stateUserEntityRepository.findOne({where: { nameStateUser: 'ACTIVE' }});

        const users: User[] = await this._userRepository.find({
            where: { stateUser: stateUserActive }});

        return users;
    }

    async create(user: User): Promise<User>{
        const savedUser: User = await this._userRepository.save(user);
        return savedUser;
    }

    async update (id: number, user:User): Promise<void> {
        await this._userRepository.update(id, user);
    }

    async delete(id: number): Promise<void>{
        const stateUserActive: StateUserEntity = await this._stateUserEntityRepository.findOne({where: { nameStateUser: 'ACTIVE' }});
        const userExists = await this._userRepository.findOne(id, {
            where: {stateUser: stateUserActive }
        });

        if(!userExists){
            throw new NotFoundException();
        }

        const stateUserInactive: StateUserEntity = await this._stateUserEntityRepository.findOne({where: { nameStateUser: 'INACTIVE' }});
        await this._userRepository.update(id, { stateUser: stateUserInactive });
    }
}
