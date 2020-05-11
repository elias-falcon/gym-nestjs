import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from './customer.repository';

@Module({
    imports: [TypeOrmModule.forFeature([CustomerRepository])]
})
export class CustomerModule {}
