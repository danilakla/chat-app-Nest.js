import {Resolver, Mutation, Args, Context} from '@nestjs/graphql';
import {Authentication} from '../../authentication/entities/authentication.entity';

import {CheckGoogleTokenInput} from "../dto/check-google-token.input";
import {GoogleService} from "./google.service";

@Resolver(() => Authentication)
export class GoogleResolver {
    constructor(private readonly googleService: GoogleService) {
    }

    @Mutation(() => Authentication)
    async loginGoogle(@Args('checkGoogleTokenInput') checkGoogleTokenInput: CheckGoogleTokenInput,
                @Context() context) {
        try {
            const {refresh_token, ...userData}=await this.googleService.login(checkGoogleTokenInput.token)
            context.res.cookie('refresh_token', `${refresh_token}`,)
            return {refresh_token, ...userData}
        } catch (e) {
            return e
        }
    }

    @Mutation(() => Authentication)
    async registrationGoogle(@Args('checkGoogleTokenInput') checkGoogleTokenInput: CheckGoogleTokenInput,
                             @Context() context) {
        try {

            const {refresh_token, ...userData} = await this.googleService.registration(checkGoogleTokenInput.token)
            context.res.cookie('refresh_token', `${refresh_token}`,)
            return {refresh_token, ...userData}
        } catch (e) {
            return e
        }
    }


}
