import { IsString, MaxLength, IsNumber } from "class-validator";

export class UpdateCustomerDto {

    @IsString()
    @MaxLength(25, {message: 'This email is not valid, its too large.'})
    email: string;

    @IsNumber()
    mobilePhone: number;

    @IsString()
    @MaxLength(100, {message: 'This name is not valid, its too large.'})
    address: string;

}