import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateUserEntityRepository } from './state-user-entity.respository';

@Module({
    imports: [TypeOrmModule.forFeature([StateUserEntityRepository])]

})
export class StateUserEntityModule {}
