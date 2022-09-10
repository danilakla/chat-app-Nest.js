import {BadRequestException, Injectable} from '@nestjs/common';
import {google, Auth} from 'googleapis';
import {AuthenticationService} from "../../authentication/authentication.service";


@Injectable()
export class GoogleService {
    oauthClient: Auth.OAuth2Client;

    constructor(private readonly authenticationService: AuthenticationService) {
        const clientID = process.env.GOOGLE_AUTH_CLIENT_ID
        const clientSecret = process.env.GOOGLE_AUTH_CLIENT_SECRET

        this.oauthClient = new google.auth.OAuth2(
            clientID,
            clientSecret
        );
    }

    async login(googleToken: string) {

        const {email, email_verified,} = await this.oauthClient.getTokenInfo(googleToken);
        const password = email + process.env.PASSWORD_KEY_EMAIL
        if (!email_verified) {
            throw new BadRequestException()
        }
        const userData = this.authenticationService.login({email, password})
        return userData

    }

    async registration(googleToken: string) {


        const {email, email_verified,} = await this.oauthClient.getTokenInfo(googleToken);
        const password = email + process.env.PASSWORD_KEY_EMAIL
        if (!email_verified) {
            throw new BadRequestException()
        }
        const userData = this.authenticationService.registration({email, password})
        return userData

    }
}
