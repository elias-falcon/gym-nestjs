import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { RoutineRepository } from './routine.repository';
import { ReadRoutineDto, CreateRoutineDto, UpdateRoutineDto } from './dtos';
import { Routine } from './routine.entity';

@Injectable()
export class RoutineService {
   
        constructor(
            @InjectRepository(RoutineRepository)
            private readonly _routineRepository: RoutineRepository,
        ){}
    
        async get(id: number): Promise<ReadRoutineDto>{
            if(!id){
                throw new BadRequestException('id must be sent')
            }
    
            const routine: Routine = await this._routineRepository.findOne(id);
    
            if (!routine){
                throw new NotFoundException();
            }
    
            return plainToClass(ReadRoutineDto, routine);
        }
    
        async getAll(): Promise<ReadRoutineDto[]>{
            const routines: Routine[] = await this._routineRepository.find();
            return routines.map((routine: Routine) => plainToClass(ReadRoutineDto, routine));
        }
    
        async create(routine: Partial<CreateRoutineDto>): Promise<ReadRoutineDto>{
            const saveRoutine: Routine = await this._routineRepository.save(routine);
            return plainToClass(ReadRoutineDto, saveRoutine);
        }
    
        async update (routineId: number, routine: Partial<UpdateRoutineDto>): Promise<ReadRoutineDto> {
            const foundRoutine: Routine = await this._routineRepository.findOne(routineId);
    
            if(!foundRoutine){
                throw new NotFoundException('This routine does nt exist');
            }
    
            foundRoutine.nameRoutine = routine.nameRoutine;
            foundRoutine.descriptionRoutine = routine.descriptionRoutine;
            foundRoutine.sexMale = routine.sexMale;
    
            const updateRoutine: Routine = await this._routineRepository.save(foundRoutine);
    
            return plainToClass(ReadRoutineDto, updateRoutine);
        }
    
        async delete(id: number): Promise<void>{
            const routineExist = await this._routineRepository.findOne(id);
            if(!routineExist){
                throw new NotFoundException();
            }
            await this._routineRepository.delete(id);
        }

}
