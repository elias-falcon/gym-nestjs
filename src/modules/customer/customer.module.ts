import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from './customer.repository';
import { CustomerServiceService } from './customer-service/customer-service.service';

@Module({
    imports: [TypeOrmModule.forFeature([CustomerRepository])],
    providers: [CustomerServiceService]
})
export class CustomerModule {}
