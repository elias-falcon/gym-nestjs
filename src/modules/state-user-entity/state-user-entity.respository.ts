import { Repository, EntityRepository } from "typeorm";
import { StateUserEntity } from "./state-user-entity.entity";

@EntityRepository(StateUserEntity)
export class StateUserEntityRepository extends Repository<StateUserEntity>{}