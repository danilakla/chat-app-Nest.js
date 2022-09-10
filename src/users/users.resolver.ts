import {Resolver, Query, Mutation, Args, ResolveField, Parent, Context} from '@nestjs/graphql';
import {UsersService} from './users.service';
import {Users} from './entities/user.entity';
import {CreateUserInput} from './dto/create-user.input';
import {Roles} from "../roles/entities/role.entity";
import {RolesService} from "../roles/roles.service";
import {AddRoleInput} from "./dto/add-role.input";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../authentication/guard/jwt-auth.guard";
import {RoleAuthGuard} from "../authentication/guard/role-auth.guard";
import {Role} from "../authentication/decorator/roles.decorator";

@Resolver(() => Users)
export class UsersResolver {
    constructor(private readonly usersService: UsersService,
                private readonly rolesService: RolesService
    ) {
    }

    @Mutation(() => Users)
    createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        try {
            return this.usersService.create(createUserInput);

        } catch (e) {
            return e
        }
    }

    @Query(() => [Users], {name: 'users'})
    @Role('Manager', 'Admin')
    @UseGuards(JwtAuthGuard, RoleAuthGuard)
    findAll() {
        try {
            return this.usersService.findAll();

        } catch (e) {
            return e
        }
    }

    @Query(() => Users, {name: 'user'})
    @UseGuards(JwtAuthGuard)
    findOne(@Context() context) {
        try {
            return this.usersService.findOneById(context.req.user.id);

        } catch (e) {
            return e
        }
    }

    @ResolveField(() => [Roles])
    async roles(@Parent() user: Users) {
        try {
            const {id} = user;
            const roles = await this.rolesService.showByUser(id);
            return roles
        } catch (e) {
            return e
        }

    }

    @Mutation(() => Users)
    addRole(@Args('addRoleInput') addRoleInput: AddRoleInput) {
        try {
            return this.usersService.addRole(addRoleInput);

        } catch (e) {
            throw e
        }
    }


}
