import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { ConfigService } from 'src/config/config.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt'
import { ConfigModule } from 'src/config/config.module';
import { Configuration } from 'src/config/config.keys';
import { StateUserEntityRepository } from '../state-user-entity/state-user-entity.respository';


@Module({
  imports: [TypeOrmModule.forFeature([AuthRepository]), TypeOrmModule.forFeature([StateUserEntityRepository]),
            PassportModule.register({
              defaultStrategy: 'jwt',
            }),
          JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(config: ConfigService){
              return {
                secret: config.get(Configuration.JWT_SECRET),
                signOptions: {
                  expiresIn: 3600
                }
              }
            }
          }),],

  controllers: [AuthController],
  providers: [AuthService, ConfigService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
