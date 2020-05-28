import { Controller, Get, Param, Post, Body, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ReadExcerciseDto, CreateExcerciseDto, UpdateExcerciseDto } from './dtos';


@Controller('exercise')
export class ExerciseController {
            constructor(private readonly _exerciseService: ExerciseService){}
        
            @Get(':exerciseId')
            async getExercise(@Param('exerciseId', ParseIntPipe) exerciseId: number): Promise<ReadExcerciseDto>{
                return this._exerciseService.get(exerciseId);
            }
        
            @Get()
            async getExercises(): Promise<ReadExcerciseDto[]>{
                return this._exerciseService.getAll();
            }
        
            @Post()
            createExercise (@Body() routine: Partial<CreateExcerciseDto> ): Promise<ReadExcerciseDto>{
                return this._exerciseService.create(routine);
            }
        
            @Patch(':exerciseId')
             updateExercise (@Param('exerciseId', ParseIntPipe) exerciseId: number, @Body() exercise: Partial<UpdateExcerciseDto> ){
                return this._exerciseService.update(exerciseId, exercise);
            }
        
            @Delete(':exerciseId')
             deleteExercise(@Param('exerciseId', ParseIntPipe) exerciseId: number){
                return this._exerciseService.delete(exerciseId);
             }
}
