import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserInput} from './dto/create-user.input';
import {InjectRepository} from "@nestjs/typeorm";
import {Users} from "./entities/user.entity";
import {Repository} from "typeorm";
import {RolesService} from "../roles/roles.service";
import {AddRoleInput} from "./dto/add-role.input";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>,
                private readonly rolesService: RolesService) {
    }

    async create(createUserInput: CreateUserInput) {

        const user = this.usersRepository.create(createUserInput)
        const role = await this.rolesService.findOne('User')
        user.roles = [role]
        return await this.usersRepository.save(user)


    }

    async findAll() {

        const users = await this.usersRepository.find()
        return users

    }

    async findOneById(id: number) {

        const user = await this.usersRepository.findOneBy({id})
        if (!user){
            throw new BadRequestException()
        }
        return user

    }

    async addRole({role, userId}: AddRoleInput) {
        const user = await this.usersRepository.findOne({
            where: {
                id: userId
            },
            relations: {
                roles: true
            }
        })
        const isExist = user.roles.find((userRole => userRole.role === role))
        if (isExist) {
            throw new HttpException('User has the same role', HttpStatus.BAD_REQUEST)
        }
        const roleAdd = await this.rolesService.findOne(role)
        user.roles.push(roleAdd)
        return await this.usersRepository.save(user)


    }

    async findOneByEmail(email: string) {
            const user = await this.usersRepository.findOne({
                where: {
                    email
                },
                relations: {
                    roles: true
                }
            })
            return user
    }

    async save(user: Users) {
        return await this.usersRepository.save(user)
    }
}
