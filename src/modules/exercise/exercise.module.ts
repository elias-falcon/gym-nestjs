import { Module } from '@nestjs/common';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseRepository } from './exercise.repository';



@Module({
  imports: [MulterModule.register({
    dest: './src/modules/exercise/uploads',
  }), TypeOrmModule.forFeature([ExerciseRepository])],
  controllers: [ExerciseController],
  providers: [ExerciseService]
})
export class ExerciseModule {}
