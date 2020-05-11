import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SexRepository } from './sex.repository';

@Module({
    imports: [TypeOrmModule.forFeature([SexRepository])]

})
export class SexModule {}
