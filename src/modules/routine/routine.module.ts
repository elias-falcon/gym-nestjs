import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutineRepository } from './routine.repository';
import { RoutineController } from './routine.controller';
import { RoutineService } from './routine.service';

@Module({
    imports: [TypeOrmModule.forFeature([RoutineRepository])],
    controllers: [RoutineController],
    providers: [RoutineService]

})
export class RoutineModule {}
