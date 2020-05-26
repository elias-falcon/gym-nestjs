import { Controller, Get, Param, Post, Body, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorator/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roletype.enum';
import { ReadUserDto, UpdateUserDto } from './dto';

@Controller('users')
export class UserController {
    constructor(private readonly _userService: UserService){}

    @Get(':userId')
    @Roles(RoleType.ADMIN, RoleType.TRAINER)
    @UseGuards(AuthGuard(), RoleGuard)
    getUser(@Param('userId', ParseIntPipe) userId: number): Promise<ReadUserDto>{
       return this._userService.get(userId);
    }

    @Get()
    @Roles(RoleType.ADMIN, RoleType.TRAINER)
    @UseGuards(AuthGuard(), RoleGuard)
    getUsers(): Promise<ReadUserDto[]>{
        return this._userService.getAll();
    }

    @Patch(':userId')
    @UseGuards(AuthGuard())
     updateUser (@Param('userId', ParseIntPipe) userId: number, @Body() user: UpdateUserDto ){
        return this._userService.update(userId, user);
    }

    @Delete(':userId')
    @Roles(RoleType.ADMIN, RoleType.TRAINER)
    @UseGuards(AuthGuard(), RoleGuard)
     deleteUser(@Param('userId', ParseIntPipe) userId:number): Promise <void>{
         return this._userService.delete(userId);
    }

    @Post('setRole/:userId/:roleId')
    @Roles(RoleType.ADMIN)
    @UseGuards(AuthGuard(), RoleGuard)    
    setRoleToUser(@Param('userId', ParseIntPipe) userId:number, @Param('roleId', ParseIntPipe) roleId:number): Promise<boolean>{
        return this._userService.setRoleToUser(userId, roleId);
    }
}
