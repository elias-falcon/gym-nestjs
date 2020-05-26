import { Repository, EntityRepository, getConnection } from "typeorm";
import { User } from "../user/user.entity";
import { SignupDto } from "./dto";
import { RoleRepository } from "../role/role.repository";
import { Role } from "../role/role.entity";
import { RoleType } from "../role/roletype.enum";
import { genSalt, hash } from "bcryptjs";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../user/user.repository";
import { StateUserEntity } from "../state-user-entity/state-user-entity.entity";
import { StateUserEntityRepository } from "../state-user-entity/state-user-entity.respository";
import { status } from '../../shared/entity-status.enum'

@EntityRepository(User)
export class AuthRepository extends Repository<User>{

    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
    ){
        super();
    }

    async signup(signupDto: SignupDto){
        const {username, password} = signupDto;
        const user = new User();
        user.username = username;

        const _roleRepository: RoleRepository = await getConnection().getRepository(Role);
        const _stateUserRepository: StateUserEntityRepository = await getConnection().getRepository(StateUserEntity);

        const defaultRole: Role = await _roleRepository.findOne( { where: { nameRole: RoleType.CUSTOMER } });
        const defaultStateUser: StateUserEntity = await _stateUserRepository.findOne({ where: {nameStateUser: status.ACTIVE}})

        user.roles = [defaultRole];
        user.stateUser = defaultStateUser;
        
        const salt = await genSalt(10);
        user.password = await hash(password, salt);

        await this._userRepository.save(user);
    }
}