import { IsString, IsNumber } from "class-validator";
import { Expose, Exclude } from "class-transformer";

@Exclude()
export class ReadUserDetailsDto {
    @Expose()
    @IsString()
    readonly nameCustomer: string;

    @Expose()
    @IsString()
    readonly surnameCustomer: string;

    @Expose()
    @IsNumber()
    readonly dni: number;
}