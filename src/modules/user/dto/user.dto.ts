import {IsNotEmpty} from 'class-validator'
import { RoleType } from 'src/modules/role/roletype.enum';

export class UserDto{
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    username: string;
    
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    roles: RoleType[];

}