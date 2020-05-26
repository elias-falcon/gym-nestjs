import { IsString, MaxLength, IsNumber } from "class-validator";

export class UpdateCustomerDto {

    @IsNumber()
    readonly mobilePhone: number;

    @IsString()
    @MaxLength(100, {message: 'This name is not valid, its too large.'})
    readonly address: string;

}