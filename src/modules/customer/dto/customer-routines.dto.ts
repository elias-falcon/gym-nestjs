import { IsString, MaxLength, IsNumber, IsBoolean } from "class-validator";

export class ReadCustomerRoutinesDto {
    @IsNumber()
    readonly id: number;

    @IsString()
    @MaxLength(50, {message: 'This name is not valid, its too large.'})
    readonly nameRoutine: string;

    @IsString()
    @MaxLength(100, {message: 'This description is not valid, its too large.'})
    readonly descriptionRoutine: string;

    @IsString()
    @MaxLength(25, {message: 'This email is not valid, its too large.'})
    email: string;

    @IsNumber()
    mobilePhone: number;

    @IsString()
    @MaxLength(100, {message: 'This address is not valid, its too large.'})
    address: string;

    @IsBoolean()
    sexMale: boolean;

}