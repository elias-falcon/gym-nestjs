import { Controller, Get, Param, Post, Body, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { RoutineService } from './routine.service';
import { ReadRoutineDto, CreateRoutineDto, UpdateRoutineDto } from './dtos';

@Controller('routine')
export class RoutineController {

        constructor(private readonly _routineService: RoutineService){}
    
        @Get(':routineId')
        async getRoutine(@Param('routineId', ParseIntPipe) routineId: number): Promise<ReadRoutineDto>{
            return this._routineService.get(routineId);
        }
    
        @Get()
        async getRoutines(): Promise<ReadRoutineDto[]>{
            return this._routineService.getAll();
        }
    
        @Post()
        createRoutine (@Body() routine: Partial<CreateRoutineDto> ): Promise<ReadRoutineDto>{
            return this._routineService.create(routine);
        }
    
        @Patch(':routineId')
         updateRoutine (@Param('routineId', ParseIntPipe) routineId: number, @Body() routine: Partial<UpdateRoutineDto> ){
            return this._routineService.update(routineId, routine);
        }
    
        @Delete(':routineId')
         deleteRoutine(@Param('routineId', ParseIntPipe) routineId: number){
            return this._routineService.delete(routineId);
         }
}
