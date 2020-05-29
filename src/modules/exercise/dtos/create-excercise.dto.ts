import { IsString, MaxLength } from "class-validator";

export class CreateExerciseDto {
    @IsString()
    @MaxLength(50, {message: 'This name is not valid, its too large.'})
     nameExercise: string;

    @IsString()
    @MaxLength(100, {message: 'This description is not valid, its too large.'})
     descriptionExercise: string;

    @IsString()
    @MaxLength(100, {message: 'This link is not valid, its too large.'})
     linkToVideo: string;

    @IsString()
    @MaxLength(100, {message: 'This gif is not valid, its too large.'})
    gif: string;
}