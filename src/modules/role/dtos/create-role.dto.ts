import { IsString, MaxLength } from "class-validator";

export class CreateRoleDto {
    @IsString()
    @MaxLength(50, {message: 'This name is not valid, its too large.'})
    readonly nameRole: string;

    @IsString()
    @MaxLength(100, {message: 'This description is not valid, its too large.'})
    readonly descriptionRole: string;
}