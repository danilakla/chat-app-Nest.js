import {Controller, Get, Param, Post, Req, Res} from '@nestjs/common';
import {AuthenticationService} from "./authentication.service";
import {ok} from "assert";

@Controller('auth')
export class AuthenticationController {
    constructor(private authenticationService: AuthenticationService) {
    }

    @Get('verify-email/:verificationToken')
    async activateUser(@Param() params) {
        try {
            const verificationToken = params.verificationToken;
            return this.authenticationService.activeByToken(verificationToken);

        } catch (error) {
            return error
        }
    }


}
