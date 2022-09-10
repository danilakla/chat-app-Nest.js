import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateRoleInput} from './dto/create-role.input';
import {InjectRepository} from "@nestjs/typeorm";
import {Roles} from "./entities/role.entity";
import {Repository} from "typeorm";

@Injectable()
export class RolesService {
    constructor(@InjectRepository(Roles) private readonly rolesRepository: Repository<Roles>,
    ) {
    }

    async create(createRoleInput: CreateRoleInput) {

        const role = this.rolesRepository.create(createRoleInput);
        await this.rolesRepository.save(role);
        return  role

    }

    async findAll() {
       const roles=  await this.rolesRepository.find();
        return roles
    }

    async findOne(role: string) {
        return await this.rolesRepository.findOne({
            where: {
                role: role
            }
        });

    }

    async showByUser(id: number) {
        const roles = await this.rolesRepository.find({
            where: {
                users: {
                    id
                }
            }
        })
        if (!roles){
            throw new HttpException("user hasn't rolle",HttpStatus.BAD_REQUEST)
        }


        return roles
    }
}
