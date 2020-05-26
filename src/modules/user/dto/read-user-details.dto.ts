import { IsString, IsNumber } from "class-validator";
import { Expose, Exclude } from "class-transformer";

@Exclude()
export class ReadUserDetailsDto {
    @Expose()
    @IsString()
    readonly name: string;

    @Expose()
    @IsString()
    readonly surname: string;

    @Expose()
    @IsNumber()
    readonly dni: number;
}