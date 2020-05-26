import { IsString, MaxLength, IsNumber } from "class-validator";

export class ReadCustomerRoutinesDto {
    @IsNumber()
    readonly id: number;

    @IsString()
    @MaxLength(50, {message: 'This name is not valid, its too large.'})
    readonly nameRoutine: string;

    @IsString()
    @MaxLength(100, {message: 'This description is not valid, its too large.'})
    readonly descriptionRoutine: string;

}