import { Controller, Get, Param, Post, Body, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { StateUserEntityRepository } from './state-user-entity.respository';
import { ReadStateUserDto, CreateStateUserDto, UpdateStateUserDto } from './dtos';

@Controller('state-user-entity')
export class StateUserEntityController {

        constructor(private readonly _stateUserRepository: StateUserEntityRepository){}
    
        @Get(':stateUserId')
        async getStateUser(@Param('stateUserId', ParseIntPipe) stateUserId: number): Promise<ReadStateUserDto>{
            return this._stateUserRepository.get(stateUserId);
        }
    
        @Get()
        async getAll(): Promise<ReadStateUserDto[]>{
            return this._stateUserRepository.getAll();
        }
    
        @Post()
        createStateUser (@Body() state: Partial<CreateStateUserDto> ): Promise<ReadStateUserDto>{
            return this._stateUserRepository.create(state);
        }
    
        @Patch(':stateUserId')
         updateStateUser (@Param('stateUserId', ParseIntPipe) stateUserId: number, @Body() state: Partial<UpdateStateUserDto> ){
            return this._stateUserRepository.update(stateUserId, state);
        }
    
        @Delete(':stateUserId')
         deleteRole(@Param('stateUserId', ParseIntPipe) stateUserId: number){
            return this._stateUserRepository.delete(stateUserId);
        }
    }
    


}
