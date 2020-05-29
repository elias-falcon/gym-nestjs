import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutineRepository } from './routine.repository';
import { RoutineController } from './routine.controller';
import { RoutineService } from './routine.service';
import { ExerciseRepository } from '../exercise/exercise.repository';

@Module({
    imports: [TypeOrmModule.forFeature([RoutineRepository]),TypeOrmModule.forFeature([ExerciseRepository])],
    controllers: [RoutineController],
    providers: [RoutineService]

})
export class RoutineModule {}
