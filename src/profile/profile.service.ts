import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateProfileInput} from './dto/create-profile.input';
import {UpdateProfileInput} from './dto/update-profile.input';
import {createWriteStream} from "fs";
import * as path from 'path'
import {InjectRepository} from "@nestjs/typeorm";
import {Profile} from "./entities/profile.entity";
import {Repository} from "typeorm";
import {UsersService} from "../users/users.service";

@Injectable()
export class ProfileService {
    constructor(@InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
                private userService: UsersService) {
    }

    async create({name, lastname, image}: CreateProfileInput, userId) {
        let profile;
        if (!image) {
            profile= this.profileRepository.create({
                name,
                lastname,
            })
        }else{
            profile = this.profileRepository.create({
                name,
                lastname,
                image
            })
        }


        const owner = await this.userService.findOneById(Number(userId))
        if (!owner) {
            throw  new BadRequestException()
        }
        profile.user = owner
        await this.profileRepository.save(profile)
        return profile

    }

    async findOne(userId) {
        const profile = await this.profileRepository.findOne({
            where: {
                user: {
                    id: userId
                }
            },
            relations: {
                user: true
            }
        })
        if (!profile) {
            throw new BadRequestException()
        }
        return profile

    }

    async update(id: number, {name, lastname, image}: UpdateProfileInput) {
        const userProfile: Profile = await this.findOne(id)
        userProfile.image = image;
        userProfile.lastname = lastname;
        userProfile.name = name;
        return await this.profileRepository.save(userProfile)

    }


}
