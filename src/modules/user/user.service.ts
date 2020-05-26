import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { StateUserEntityRepository } from '../state-user-entity/state-user-entity.respository';
import { StateUserEntity } from '../state-user-entity/state-user-entity.entity';
import { User } from './user.entity';
import { RoleRepository } from '../role/role.repository';
import { status } from '../../shared/entity-status.enum'
import { ReadUserDto, ReadUserDetailsDto, UpdateUserDto } from './dto';
import { plainToClass } from 'class-transformer';

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

    async get(id: number): Promise<ReadUserDto>{
        if(!id){
            throw new BadRequestException('id must be sent')
        }

        const stateUserActive: StateUserEntity = await this._stateUserEntityRepository.findOne({where: { nameStateUser: status.ACTIVE }});

        const user: User = await this._userRepository.findOne(id, {
            where: { stateUser: stateUserActive }});

        if (!user){
            throw new NotFoundException();
        }

        return plainToClass(ReadUserDto, user);
    }

    async getAll(): Promise<ReadUserDto[]>{
        const stateUserActive: StateUserEntity = await this._stateUserEntityRepository.findOne({where: { nameStateUser: status.ACTIVE }});

        const users: User[] = await this._userRepository.find({
            where: { stateUser: stateUserActive }});

        return users.map((user: User) => plainToClass(ReadUserDto, user) );
    }


    async update (userId: number, user: UpdateUserDto): Promise<ReadUserDto> {
        const stateUserActive: StateUserEntity = await this._stateUserEntityRepository.findOne({where: { nameStateUser: status.ACTIVE }});

        const foundUser: User = await this._userRepository.findOne(userId, {
            where: {stateUser: stateUserActive } 
        });

        if (!foundUser){
            throw new NotFoundException('User does not exists');
        }
        foundUser.username = user.username;
        const updateUser = await this._userRepository.save(foundUser);
        return plainToClass(ReadUserDto, updateUser);
        
    }

    async delete(userId: number): Promise<void>{
        const stateUserActive: StateUserEntity = await this._stateUserEntityRepository.findOne({where: { nameStateUser: status.ACTIVE }});
        const userExist = await this._userRepository.findOne(userId, {
            where: {stateUser: stateUserActive }
        });

        if(!userExist){
            throw new NotFoundException();
        }

        const stateUserInactive: StateUserEntity = await this._stateUserEntityRepository.findOne({where: { nameStateUser: status.INACTIVE }});
        await this._userRepository.update(userId, { stateUser: stateUserInactive });
    }

    async setRoleToUser(userId: number, roleId: number): Promise<boolean>{
        const stateUserActive: StateUserEntity = await this._stateUserEntityRepository.findOne({where: { nameStateUser: status.ACTIVE }});
        const userExist = await this._userRepository.findOne(userId, {
            where: {stateUser: stateUserActive }
        });

        if(!userExist){
            throw new NotFoundException('The user does not exists');
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
