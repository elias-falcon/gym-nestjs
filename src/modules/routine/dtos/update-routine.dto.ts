import { IsString, MaxLength, IsBoolean } from "class-validator";

export class UpdateRoutineDto {
    
    @IsString()
    @MaxLength(100, {message: 'This description is not valid, its too large.'})
    readonly descriptionRoutine: string;

    @IsString()
    @MaxLength(50, {message: 'This name is not valid, its too large.'})
    readonly nameRoutine: string;

    @IsBoolean()
    readonly sexMale: boolean;
}