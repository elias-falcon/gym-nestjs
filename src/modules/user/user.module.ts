import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { StateUserEntityRepository } from '../state-user-entity/state-user-entity.respository';
import { UserController } from './user.controller';
import { SharedModule } from '../../shared/shared.module';
import { MapperService } from 'src/shared/mapper.service';
import { RoleRepository } from '../role/role.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository]), TypeOrmModule.forFeature([StateUserEntityRepository]),  TypeOrmModule.forFeature([RoleRepository]), SharedModule],
    providers: [UserService, MapperService],
    controllers: [UserController]

})
export class UserModule {}
