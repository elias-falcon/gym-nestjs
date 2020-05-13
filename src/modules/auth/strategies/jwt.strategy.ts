import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from 'src/config/config.service';
import { Configuration } from 'src/config/config.keys';
import { AuthRepository } from '../auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtPayload } from '../jwt-payload.interface';
import { StateUserEntityRepository } from 'src/modules/state-user-entity/state-user-entity.respository';
import { UnauthorizedException, Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly _configService: ConfigService,
        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository,
        @InjectRepository(StateUserEntityRepository)
        private readonly _stateUserRepository: StateUserEntityRepository){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _configService.get(Configuration.JWT_SECRET)
        });
    }

    async validate(payload: IJwtPayload){
        const { username } = payload;
        const stateUserActive = this._stateUserRepository.findOne({ where: {nameStateUser: 'ACTIVE'}});
        const user = await this._authRepository.findOne({ where: {username, stateUser: stateUserActive}});

        if(!user){
            throw new UnauthorizedException();
        }

        return payload;
    }
}