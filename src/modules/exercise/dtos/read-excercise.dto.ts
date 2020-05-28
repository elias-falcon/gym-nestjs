import { IsString, MaxLength, IsNumber } from "class-validator";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ReadExcerciseDto {

    @Expose()
    @IsNumber()
    readonly id: number;

    @IsString()
    @MaxLength(50, {message: 'This name is not valid, its too large.'})
    readonly nameExcercise: string;

    @IsString()
    @MaxLength(100, {message: 'This description is not valid, its too large.'})
    readonly descriptionExcercise: string;

    @IsString()
    @MaxLength(100, {message: 'This link is not valid, its too large.'})
    readonly linkToVideo: string;

    @IsString()
    @MaxLength(100, {message: 'This gif is not valid, its too large.'})
    readonly gif: File;
}