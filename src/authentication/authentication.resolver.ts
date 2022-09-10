import {Resolver, Mutation, Args, Context} from '@nestjs/graphql';
import {AuthenticationService} from './authentication.service';
import {Authentication} from './entities/authentication.entity';
import {CreateUserInput} from "../users/dto/create-user.input";

import {UpdatePasswordInput} from "./dto/update-password.input";

@Resolver(() => Authentication)
export class AuthenticationResolver {
    constructor(private readonly authenticationService: AuthenticationService) {
    }

    @Mutation(() => Authentication)
    async login(@Args('createUserInput') createUserInput: CreateUserInput,
                @Context() context) {
        try {
            const {refresh_token, ...userData} = await this.authenticationService.login(createUserInput);
            context.res.cookie('refresh_token', `${refresh_token}`,)
            return {refresh_token, ...userData}
        } catch (e) {

            return e
        }
    }

    @Mutation(() => Authentication)
    async registration(@Args('createUserInput') createUserInput: CreateUserInput, @Context() context) {
        try {
            const {refresh_token, ...userData} = await this.authenticationService.registration(createUserInput);
            context.res.cookie('refresh_token', `${refresh_token}`,)
            return {refresh_token, ...userData}
        } catch (e) {
            return e
        }

    }


    @Mutation(() => String,)
    forgotPassword(@Args('email', {type: () => String}) email: string) {
        try {
            const resetToken = this.authenticationService.getResetTokenPassword(email);
            return resetToken
        } catch (e) {
            return e
        }


    }

    @Mutation(() => String)
    updatePassword(@Args('updatePasswordInput') updatePasswordInput: UpdatePasswordInput) {
        try {
            const {password, token} = updatePasswordInput
            const resetToken = this.authenticationService.updatePassword(token, password);
            return resetToken
        } catch (e) {
            return e
        }


    }
}
