import {Injectable, UnauthorizedException} from '@nestjs/common';
import {TokensService} from "../tokens/tokens.service";
import {UsersService} from "../users/users.service";


@Injectable()
export class AuthorizedService {
    constructor(private tokenService: TokensService,
                private usersService: UsersService) {
    }

    async logoutUser(refreshToken) {
        await this.tokenService.deleteToken(refreshToken);
        return true
    }

    async refresh(refreshToken) {
        const userData = await this.tokenService.validationRefreshToken(refreshToken);
        const tokenFromDb = await this.tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw  new UnauthorizedException()
        }
        const user = await this.usersService.findOneByEmail(userData.email)
        const tokens = await this.tokenService.initializationTokens(user)
        return {
            ...tokens,
            user
        };
    }
}
