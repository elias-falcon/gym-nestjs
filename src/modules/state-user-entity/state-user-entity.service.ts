import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { StateUserEntityRepository } from './state-user-entity.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadStateUserDto, CreateStateUserDto, UpdateStateUserDto } from './dtos';
import { StateUserEntity } from './state-user-entity.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class StateUserEntityService {

    constructor(
        @InjectRepository(StateUserEntityRepository)
        private readonly _stateUserRepository: StateUserEntityRepository,
    ){}

    async get(id: number): Promise<ReadStateUserDto>{
        if(!id){
            throw new BadRequestException('id must be sent')
        }

        const state: StateUserEntity = await this._stateUserRepository.findOne(id);

        if (!state){
            throw new NotFoundException();
        }

        return plainToClass(ReadStateUserDto, state);
    }

    async getAll(): Promise<ReadStateUserDto[]>{
        const states: StateUserEntity[] = await this._stateUserRepository.find();
        return states.map((state: StateUserEntity) => plainToClass(ReadStateUserDto, state));
    }

    async create(state: Partial<CreateStateUserDto>): Promise<ReadStateUserDto>{
        const stateExist : StateUserEntity = await this._stateUserRepository.findOne({where: {nameStateUser: state.nameStateUser} });
        if(stateExist){
            throw new ConflictException("State already exists");
        }
        const savedStateUser: StateUserEntity = await this._stateUserRepository.save(state);
        return plainToClass(ReadStateUserDto, savedStateUser);
    }

    async update (stateUserId: number, state: Partial<UpdateStateUserDto>): Promise<ReadStateUserDto> {
        const foundState: StateUserEntity = await this._stateUserRepository.findOne(stateUserId);

        if(!foundState){
            throw new NotFoundException('This state does nt exist');
        }

        foundState.nameStateUser = state.nameStateUser;
        foundState.descriptionStateUserEntity = state.descriptionStateUserEntity;

        const updateState: StateUserEntity = await this._stateUserRepository.save (foundState);

        return plainToClass(ReadStateUserDto, updateState);
    }

    async delete(id: number): Promise<void>{
        const stateExist = await this._stateUserRepository.findOne(id);
        if(!stateExist){
            throw new NotFoundException();
        }
        await this._stateUserRepository.delete(id);
    }
}


