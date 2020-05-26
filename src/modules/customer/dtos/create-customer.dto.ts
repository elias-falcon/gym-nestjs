import { IsString, MaxLength, IsNumber } from "class-validator";

export class CreateCustomerDto {
    @IsString()
    @MaxLength(50, {message: 'This name is not valid, its too large.'})
    readonly nameCustomer: string;

    @IsString()
    @MaxLength(50, {message: 'This surname is not valid, its too large.'})
    readonly surnameCustomer: string;

    @IsNumber()
    readonly dni: number;

    @IsNumber()
    readonly years: number;

    @IsString()
    @MaxLength(25, {message: 'This email is not valid, its too large.'})
    readonly email: string;

    @IsNumber()
    readonly mobilePhone: number;

    @IsString()
    @MaxLength(100, {message: 'This address is not valid, its too large.'})
    readonly address: string;

}