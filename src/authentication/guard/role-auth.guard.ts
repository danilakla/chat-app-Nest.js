import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';
import {ROLES_KEY} from "../decorator/roles.decorator";
import {Reflector} from "@nestjs/core";

@Injectable()
export class RoleAuthGuard implements CanActivate {

    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const ctx = GqlExecutionContext.create(context);

        const userRoles = ctx.getContext().req.user.roles;

        const rolesMap = userRoles.map((role) => role.role)

        return  requiredRoles.some(role => rolesMap.includes(role))


    }
}