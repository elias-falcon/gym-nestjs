import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateUserEntityRepository } from './state-user-entity.respository';
import { StateUserEntityController } from './state-user-entity.controller';
import { StateUserEntityService } from './state-user-entity.service';

@Module({
    imports: [TypeOrmModule.forFeature([StateUserEntityRepository])],
    controllers: [StateUserEntityController],
    providers: [StateUserEntityService]

})
export class StateUserEntityModule {}
