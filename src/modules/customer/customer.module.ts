import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from './customer.repository';
import { UserRepository } from '../user/user.repository';
import { StateUserEntityRepository } from '../state-user-entity/state-user-entity.respository' 
import { CustomerServiceService } from './customer-service.service';
import { CustomerController } from './customer.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CustomerRepository]), TypeOrmModule.forFeature([UserRepository]), TypeOrmModule.forFeature([StateUserEntityRepository])],
    providers: [CustomerServiceService],
    controllers: [CustomerController]
})
export class CustomerModule {}
