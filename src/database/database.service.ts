import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from 'src/config/config.service'
import { ConnectionOptions } from 'typeorm'
import { Configuration } from 'src/config/config.keys'


export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config: ConfigService) {
            return {
                ssl: true,
                type: 'mysql',
                host: config.get(Configuration.HOST),
                username: config.get(Configuration.USERNAME),
                password: config.get(Configuration.PASSWORD),
                database: config.get(Configuration.DATABASE),
                entities: ["dist/**/*.entity{.ts,.js}"],
                synchronize: true,

            } as ConnectionOptions
        }
    })
]