import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Users} from "./entities/user.entity";
import {RolesModule} from "../roles/roles.module";

@Module({
  imports:[TypeOrmModule.forFeature([Users]), RolesModule],
  providers: [UsersResolver, UsersService],
  exports:[UsersService]
})
export class UsersModule {}
