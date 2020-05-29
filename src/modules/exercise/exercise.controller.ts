import { Controller, Get, Param, Post, Body, Patch, Delete, ParseIntPipe, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ReadExerciseDto, CreateExerciseDto, UpdateExerciseDto } from './dtos';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { Roles } from '../role/decorator/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RoleType } from '../role/roletype.enum';
import { RoleGuard } from '../role/guards/role.guard';


const pngFileFilter = (req, file, callback) => {

    let ext = path.extname(file.originalname);

    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif'){
        req.fileValidationError = 'Invalid file type';
        return callback(new Error('Invalid file type'), false);
    }

    return callback(null, true);

}


@Controller('exercise')
export class ExerciseController {
            constructor(private readonly _exerciseService: ExerciseService){}
        
            
            @Get(':exerciseId')
            @Roles(RoleType.ADMIN, RoleType.TRAINER, RoleType.GENERAL)
            @UseGuards(AuthGuard(), RoleGuard)
            async getExercise(@Param('exerciseId', ParseIntPipe) exerciseId: number): Promise<ReadExerciseDto>{
                return this._exerciseService.get(exerciseId);
            }
        
        
            @Get()
            @Roles(RoleType.ADMIN, RoleType.TRAINER, RoleType.GENERAL)
            @UseGuards(AuthGuard(), RoleGuard)
            async getExercises(): Promise<ReadExerciseDto[]>{
                return this._exerciseService.getAll();
            }
        
            
            @Post()
            @Roles(RoleType.ADMIN, RoleType.TRAINER)
            @UseGuards(AuthGuard(), RoleGuard)
            @UseInterceptors(
                FileInterceptor('file',{
                    fileFilter: pngFileFilter,
                }))
            createExercise (@UploadedFile() file, @Body() exercise ){
                file.originalname = exercise.nameExercise;
                let exerciseToSend: CreateExerciseDto = {
                    'nameExercise': exercise.nameExercise,
                    'descriptionExercise': exercise.descriptionExercise,
                    'linkToVideo': exercise.linkToVideo,
                    'gif': exercise.gif
                }
                return this._exerciseService.create(exerciseToSend, file.path);
            }
        
            @Patch(':exerciseId')
            @Roles(RoleType.ADMIN, RoleType.TRAINER)
            @UseGuards(AuthGuard(), RoleGuard)
            @UseInterceptors(
                FileInterceptor('file',{
                    fileFilter: pngFileFilter
                }))
             updateExercise (@Param('exerciseId', ParseIntPipe) exerciseId: number, @UploadedFile() file, @Body() exercise){
                let exerciseToSend: CreateExerciseDto = {
                    'nameExercise': exercise.nameExercise,
                    'descriptionExercise': exercise.descriptionExercise,
                    'linkToVideo': exercise.linkToVideo,
                    'gif': exercise.gif
                }
                return this._exerciseService.update(exerciseId, exerciseToSend, file.path );
            }
        
            @Delete(':exerciseId')
            @Roles(RoleType.ADMIN, RoleType.TRAINER, RoleType.GENERAL)
            @UseGuards(AuthGuard(), RoleGuard)
             deleteExercise(@Param('exerciseId', ParseIntPipe) exerciseId: number){
                return this._exerciseService.delete(exerciseId);
             }
}
