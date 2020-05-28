import { Repository, EntityRepository } from "typeorm";
import { Exercise } from './exercise.entity';

@EntityRepository(Exercise)
export class ExerciseRepository extends Repository<Exercise>{}