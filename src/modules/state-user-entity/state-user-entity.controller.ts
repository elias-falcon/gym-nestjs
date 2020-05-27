import { Controller, Get, Param, Post, Body, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { ReadStateUserDto, CreateStateUserDto, UpdateStateUserDto } from './dtos';
import { StateUserEntityService } from './state-user-entity.service';

@Controller('state-user-entity')
export class StateUserEntityController {

        constructor(private readonly _stateUserService: StateUserEntityService){}
    
        @Get(':stateUserId')
        async getStateUser(@Param('stateUserId', ParseIntPipe) stateUserId: number): Promise<ReadStateUserDto>{
            return this._stateUserService.get(stateUserId);
        }
    
        @Get()
        async getAll(): Promise<ReadStateUserDto[]>{
            return this._stateUserService.getAll();
        }
    
        @Post()
        createStateUser (@Body() state: Partial<CreateStateUserDto> ): Promise<ReadStateUserDto>{
            return this._stateUserService.create(state);
        }
    
        @Patch(':stateUserId')
         updateStateUser (@Param('stateUserId', ParseIntPipe) stateUserId: number, @Body() state: Partial<UpdateStateUserDto> ){
            return this._stateUserService.update(stateUserId, state);
        }
    
        @Delete(':stateUserId')
         deleteRole(@Param('stateUserId', ParseIntPipe) stateUserId: number){
            return this._stateUserService.delete(stateUserId);
        }
}
    



