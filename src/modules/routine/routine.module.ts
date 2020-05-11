import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutineRepository } from './routine.repository';

@Module({
    imports: [TypeOrmModule.forFeature([RoutineRepository])]

})
export class RoutineModule {}
