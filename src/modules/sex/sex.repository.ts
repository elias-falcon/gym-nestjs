import { Repository, EntityRepository } from "typeorm";
import { Sex } from "./sex.entity";

@EntityRepository(Sex)
export class SexRepository extends Repository<Sex>{}