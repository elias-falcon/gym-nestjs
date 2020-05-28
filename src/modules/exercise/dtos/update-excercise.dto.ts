import { IsString, MaxLength, IsNumber } from "class-validator";

export class UpdateExcerciseDto {

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