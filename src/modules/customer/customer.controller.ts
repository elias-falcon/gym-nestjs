import { CustomerServiceService } from './customer-service.service';
import { Controller, Get, Param, Post, Body, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReadCustomerDto, CreateCustomerDto, UpdateCustomerDto } from './dtos';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorator/role.decorator';
import { RoleType } from '../role/roletype.enum';
import { RoleGuard } from '../role/guards/role.guard';

@Controller('customer')
export class CustomerController {

    constructor( private readonly _customerService: CustomerServiceService){}

    @Get(':customerId')
    @Roles(RoleType.ADMIN, RoleType.TRAINER)
    @UseGuards(AuthGuard(), RoleGuard)
    async getRole(@Param('customerId', ParseIntPipe) customerId: number): Promise<ReadCustomerDto>{
        return this._customerService.get(customerId);
    }

    @Get()
    @Roles(RoleType.ADMIN, RoleType.TRAINER)
    @UseGuards(AuthGuard(), RoleGuard)
    async getRoles(): Promise<ReadCustomerDto[]>{
        return this._customerService.getAll();
    }

    @Post()
    @Roles(RoleType.ADMIN, RoleType.TRAINER)
    @UseGuards(AuthGuard(), RoleGuard)
    createRole (@Body() customer: CreateCustomerDto ): Promise<ReadCustomerDto>{
        return this._customerService.create(customer);
    }

    @Patch(':customerId')
    @Roles(RoleType.ADMIN, RoleType.TRAINER)
    @UseGuards(AuthGuard(), RoleGuard)
     updateCustomer (@Param('customerId', ParseIntPipe) customerId: number, @Body() customer: Partial<UpdateCustomerDto> ){
        return this._customerService.update(customerId, customer);
    }

    @Delete(':customerId')
     deleteCustomer(@Param('customerId', ParseIntPipe) customerId: number){
        return this._customerService.delete(customerId);
    }

}
