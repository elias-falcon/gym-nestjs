import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Exercise } from './exercise.entity';
import { ExerciseRepository } from './exercise.repository';
import { ReadExcerciseDto, CreateExcerciseDto, UpdateExcerciseDto } from './dtos';

@Injectable()
export class ExerciseService {

            constructor(
                @InjectRepository(Exercise)
                private readonly _excerciseRepository: ExerciseRepository,
            ){}
        
            async get(id: number): Promise<ReadExcerciseDto>{
                if(!id){
                    throw new BadRequestException('id must be sent')
                }
        
                const exercise: Exercise = await this._excerciseRepository.findOne(id);
        
                if (!exercise){
                    throw new NotFoundException();
                }
        
                return plainToClass(ReadExcerciseDto, exercise);
            }
        
            async getAll(): Promise<ReadExcerciseDto[]>{
                const exercises: Exercise[] = await this._excerciseRepository.find();
                return exercises.map((exercise: Exercise) => plainToClass(ReadExcerciseDto, exercise));
            }
        
            async create(exercise: Partial<CreateExcerciseDto>): Promise<ReadExcerciseDto>{
                const saveExercise: Exercise = await this._excerciseRepository.save(exercise);
                return plainToClass(ReadExcerciseDto, saveExercise);
            }
        
            async update (exerciseId: number, exercise: Partial<UpdateExcerciseDto>): Promise<ReadExcerciseDto> {
                const foundExercise: Exercise = await this._excerciseRepository.findOne(exerciseId);
        
                if(!foundExercise){
                    throw new NotFoundException('This exercise does nt exist');
                }
        
                foundExercise.nameExcercise = exercise.nameExcercise;
                foundExercise.descriptionExcercise = exercise.descriptionExcercise;
                foundExercise.linkToVideo = exercise.linkToVideo;
                foundExercise.gif = exercise.gif;
        
                const updateExercise: Exercise = await this._excerciseRepository.save(foundExercise);
        
                return plainToClass(ReadExcerciseDto, updateExercise);
            }
        
            async delete(id: number): Promise<void>{
                const exerciseExist = await this._excerciseRepository.findOne(id);
                if(!exerciseExist){
                    throw new NotFoundException();
                }
                await this._excerciseRepository.delete(id);
            }
}
