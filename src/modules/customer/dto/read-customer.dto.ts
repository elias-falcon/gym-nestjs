import { IsString, MaxLength, IsNumber } from "class-validator";
import { ReadCustomerRoutinesDto } from "./customer-routines.dto"

export class ReadCustomerDto {
    @IsNumber()
    readonly id: number;

    @IsString()
    @MaxLength(50, {message: 'This name is not valid, its too large.'})
    readonly nameCustomer: string;

    @IsString()
    @MaxLength(50, {message: 'This surname is not valid, its too large.'})
    readonly surnameCustomer: string;

    @IsNumber()
    dni: number;

    @IsNumber()
    years: number;

    @IsString()
    @MaxLength(25, {message: 'This email is not valid, its too large.'})
    email: string;

    @IsNumber()
    mobilePhone: number;

    @IsString()
    @MaxLength(100, {message: 'This address is not valid, its too large.'})
    address: string;

    @Type(type => ReadCustomerRoutinesDto)
    readonly routines: ReadCustomerRoutinesDto

}