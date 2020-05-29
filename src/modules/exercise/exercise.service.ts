import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Exercise } from './exercise.entity';
import { ExerciseRepository } from './exercise.repository';
import { ReadExerciseDto, CreateExerciseDto, UpdateExerciseDto } from './dtos';

@Injectable()
export class ExerciseService {

            constructor(
                @InjectRepository(Exercise)
                private readonly _excerciseRepository: ExerciseRepository,
            ){}
        
            async get(id: number): Promise<ReadExerciseDto>{
                if(!id){
                    throw new BadRequestException('id must be sent')
                }
        
                const exercise: Exercise = await this._excerciseRepository.findOne(id);
        
                if (!exercise){
                    throw new NotFoundException();
                }
        
                return plainToClass(ReadExerciseDto, exercise);
            }
        
            async getAll(): Promise<ReadExerciseDto[]>{
                const exercises: Exercise[] = await this._excerciseRepository.find();
                return exercises.map((exercise: Exercise) => plainToClass(ReadExerciseDto, exercise));
            }
        
            async create(exercise: Partial<CreateExerciseDto>, pathFile: string): Promise<ReadExerciseDto>{
                exercise.gif = pathFile;
                const savedExercise: Exercise = await this._excerciseRepository.save(exercise);
                return plainToClass(ReadExerciseDto, savedExercise);
            }
        
            async update (exerciseId: number, exercise: Partial<UpdateExerciseDto>, filePath: string): Promise<ReadExerciseDto> {
                const foundExercise: Exercise = await this._excerciseRepository.findOne(exerciseId);
        
                if(!foundExercise){
                    throw new NotFoundException('This exercise does nt exist');
                }
                var fs = require('fs');
                var filePathToDelete = foundExercise.gif;
                fs.unlink(filePathToDelete, function(err) {
                    if (err) throw err;
                  });
        
                foundExercise.nameExercise = exercise.nameExercise;
                foundExercise.descriptionExercise = exercise.descriptionExercise;
                foundExercise.linkToVideo = exercise.linkToVideo;
                foundExercise.gif = filePath;
        
                const updateExercise: Exercise = await this._excerciseRepository.save(foundExercise);
        
                return plainToClass(ReadExerciseDto, updateExercise);
            }
        
            async delete(id: number): Promise<void>{
                const exerciseExist = await this._excerciseRepository.findOne(id);
                if(!exerciseExist){
                    throw new NotFoundException();
                }
                await this._excerciseRepository.delete(id);
            }
}
