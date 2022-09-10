import {Resolver, Mutation, Context} from '@nestjs/graphql';
import {AuthorizedService} from './authorized.service';
import {Authorized} from './entities/authorized.entity';

import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../authentication/guard/jwt-auth.guard";


@Resolver(() => Authorized)
export class AuthorizedResolver {
    constructor(private readonly authorizedService: AuthorizedService) {
    }

    @Mutation(() => Authorized)
    updateRefreshToken(@Context() context) {
        try {
            const refreshToken = context.req.cookies['refresh_token']
            const userData = this.authorizedService.refresh(refreshToken)
            return userData
        } catch (e) {
            return e
        }
    }

    @Mutation(() => Boolean)
    @UseGuards(JwtAuthGuard)
    async logout(@Context() context) {
        try {
            const refreshToken = context.req.cookies['refresh_token']
            context.res.clearCookie('refresh_token');

            return await this.authorizedService.logoutUser(refreshToken)
        } catch (e) {
            return false;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Boolean)
    async isAuth() {
        try {
            return true

        } catch (e) {
            return false
        }
    }

}
