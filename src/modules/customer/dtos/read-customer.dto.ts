import { IsString, MaxLength, IsNumber } from "class-validator";
import { ReadCustomerRoutinesDto } from "./customer-routines.dto"
import { Type } from "class-transformer";


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
    readonly dni: number;

    @IsNumber()
    readonly years: number;

    @IsString()
    @MaxLength(25, {message: 'This email is not valid, its too large.'})
    readonly  email: string;

    @IsNumber()
    readonly  mobilePhone: number;

    @IsString()
    @MaxLength(100, {message: 'This address is not valid, its too large.'})
    readonly  address: string;

    @Type(type => ReadCustomerRoutinesDto)
    readonly routine: ReadCustomerRoutinesDto

}