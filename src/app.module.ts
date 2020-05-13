import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { DatabaseModule } from './database/database.module';
import { CustomerModule } from './modules/customer/customer.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
import { StateUserEntityModule } from './modules/state-user-entity/state-user-entity.module';
import { RoutineModule } from './modules/routine/routine.module';
import { SexModule } from './modules/sex/sex.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ConfigModule, DatabaseModule, CustomerModule, RoleModule, UserModule, StateUserEntityModule, RoutineModule, SexModule, SharedModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
