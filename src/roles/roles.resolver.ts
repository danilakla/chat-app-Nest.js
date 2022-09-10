import {Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import {RolesService} from './roles.service';
import {Roles} from './entities/role.entity';
import {CreateRoleInput} from './dto/create-role.input';

@Resolver(() => Roles)
export class RolesResolver {
    constructor(private readonly rolesService: RolesService) {
    }

    @Mutation(() => Roles)
    createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
        try {
            return this.rolesService.create(createRoleInput);
        } catch (e) {
            return e
        }
    }

    @Query(() => [Roles], {name: 'roles'})
    findAll() {
        try {
            return this.rolesService.findAll();
        } catch (e) {
            return e
        }
    }

    @Query(() => Roles, {name: 'role'})
    findOne(@Args('role', {type: () => String}) role: string) {
        try {
            return this.rolesService.findOne(role);
        } catch (e) {
            return e
        }
    }


}
