import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Roles} from "./entities/role.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Roles])],
  providers: [RolesResolver, RolesService],
  exports:[RolesService]
})
export class RolesModule {}
