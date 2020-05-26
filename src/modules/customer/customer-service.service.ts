import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { StateUserEntityRepository } from '../state-user-entity/state-user-entity.respository';
import { StateUserEntity } from '../state-user-entity/state-user-entity.entity'
import { ReadCustomerDto, UpdateCustomerDto } from './dtos';
import { status } from '../../shared/entity-status.enum'
import { plainToClass } from 'class-transformer';
import { CustomerRepository } from './customer.repository';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class CustomerServiceService {

    constructor(
        @InjectRepository(CustomerRepository)
        private readonly _customerRepository: CustomerRepository,
        @InjectRepository(StateUserEntityRepository)
        private readonly _stateUserEntityRepository: StateUserEntityRepository,
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
    ){}

    async get(id: number): Promise<ReadCustomerDto>{
        if(!id){
            throw new BadRequestException('id must be sent')
        }

        const customer: Customer = await this._customerRepository.findOne(id);
         if (!customer){
            throw new NotFoundException();
        }

        return plainToClass(ReadCustomerDto, customer);
    }

    async getAll(): Promise<ReadCustomerDto[]>{
        const customers: Customer[] = await this._customerRepository.find();

        return customers.map((customer: Customer) => plainToClass(ReadCustomerDto, customer) );
    }


    async update (customerId: number, customer: UpdateCustomerDto): Promise<ReadCustomerDto> {

        const foundCustomer: Customer = await this._customerRepository.findOne(customerId);

        if (!foundCustomer){
            throw new NotFoundException('Customer does not exists');
        }
        foundCustomer.email = customer.email;
        foundCustomer.mobilePhone = customer.mobilePhone;
        foundCustomer.address = customer.address;
        const updateCustomer = await this._customerRepository.save(foundCustomer);
        return plainToClass(ReadCustomerDto, updateCustomer);
    }

    async delete(customerId: number): Promise<void>{
        const customerExist = await this._customerRepository.findOne(customerId);

        if(!customerExist){
            throw new NotFoundException();
        }

        const stateUserInactive: StateUserEntity = await this._stateUserEntityRepository.findOne({where: { nameStateUser: status.INACTIVE }});
        await this._userRepository.update(customerExist.user.id, { stateUser: stateUserInactive });
    }


}
