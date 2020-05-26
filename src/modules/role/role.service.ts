import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { ReadRoleDto, CreateRoleDto, UpdateRoleDto } from './dtos';
import { plainToClass } from 'class-transformer';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository,
    ){}

    async get(id: number): Promise<ReadRoleDto>{
        if(!id){
            throw new BadRequestException('id must be sent')
        }

        const role: Role = await this._roleRepository.findOne(id);

        if (!role){
            throw new NotFoundException();
        }

        return plainToClass(ReadRoleDto, role);
    }

    async getAll(): Promise<ReadRoleDto[]>{
        const roles: Role[] = await this._roleRepository.find();
        return roles.map((role: Role) => plainToClass(ReadRoleDto, role));
    }

    async create(role: Partial<CreateRoleDto>): Promise<ReadRoleDto>{
        const savedRole: Role = await this._roleRepository.save(role);
        return plainToClass(ReadRoleDto, savedRole);
    }

    async update (roleId: number, role: Partial<UpdateRoleDto>): Promise<ReadRoleDto> {
        const foundRole: Role = await this._roleRepository.findOne(roleId);

        if(!foundRole){
            throw new NotFoundException('This role does nt exist');
        }

        foundRole.nameRole = role.nameRole;
        foundRole.descriptionRole = role.descriptionRole;

        const updateRole: Role = await this._roleRepository.save (foundRole);

        return plainToClass(ReadRoleDto, updateRole);
    }

    async delete(id: number): Promise<void>{
        const roleExists = await this._roleRepository.findOne(id);
        if(!roleExists){
            throw new NotFoundException();
        }
        await this._roleRepository.delete(id);
    }
}
