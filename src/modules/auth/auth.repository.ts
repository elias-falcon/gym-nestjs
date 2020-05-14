import { Repository, EntityRepository, getConnection } from "typeorm";
import { User } from "../user/user.entity";
import { SignupDto } from "./dto";
import { RoleRepository } from "../role/role.repository";
import { Role } from "../role/role.entity";
import { RoleType } from "../role/roletype.enum";
import { genSalt, hash } from "bcryptjs";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../user/user.repository";

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

        const roleRepository: RoleRepository = await getConnection().getRepository(Role);

        const defaultRole: Role = await roleRepository.findOne( { where: { nameRole: RoleType.CUSTOMER } });

        user.roles = [defaultRole];
        
        const salt = await genSalt(10);
        user.password = await hash(password, salt);

        await this._userRepository.save(user);
    }
}