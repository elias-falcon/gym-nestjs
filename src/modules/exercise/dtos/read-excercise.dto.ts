import { IsString, MaxLength, IsNumber } from "class-validator";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ReadExerciseDto {

    @Expose()
    @IsNumber()
    readonly id: number;

    @IsString()
    @MaxLength(50, {message: 'This name is not valid, its too large.'})
    readonly nameExercise: string;

    @IsString()
    @MaxLength(100, {message: 'This description is not valid, its too large.'})
    readonly descriptionExercise: string;

    @IsString()
    @MaxLength(100, {message: 'This link is not valid, its too large.'})
    readonly linkToVideo: string;

    @IsString()
    @MaxLength(100, {message: 'This gif is not valid, its too large.'})
    readonly gif: string;
}