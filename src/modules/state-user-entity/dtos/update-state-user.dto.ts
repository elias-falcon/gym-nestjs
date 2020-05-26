import { IsString, MaxLength } from "class-validator";

export class UpdateStateUserDto {
    @IsString()
    @MaxLength(50, {message: 'This name is not valid, its too large.'})
    readonly nameStateUser: string;

    @IsString()
    @MaxLength(100, {message: 'This description is not valid, its too large.'})
    readonly descriptionStateUserEntity: string;
}