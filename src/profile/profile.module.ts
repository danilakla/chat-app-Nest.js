import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import {FileLoaderModule} from "../file-loader/file-loader.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Profile} from "./entities/profile.entity";
import {UsersModule} from "../users/users.module";

@Module({
  providers: [ProfileResolver, ProfileService],
  imports:[FileLoaderModule,TypeOrmModule.forFeature([Profile]),UsersModule]
})
export class ProfileModule {}
