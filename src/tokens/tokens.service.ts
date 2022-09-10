import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Tokens} from "./entities/token.entity";
import {UsersService} from "../users/users.service";

@Injectable()
export class TokensService {
    constructor(private jwtService: JwtService, private usersService: UsersService,
                @InjectRepository(Tokens) private readonly tokensRepository: Repository<Tokens>) {
    }

    async initializationTokens({id, email, roles}) {
        try {
            const acc = await this.generateAccessTokens({id, email, roles})
            const ref = await this.generateRefreshTokens({id, email, roles})
            console.log(ref)

            const ref_token = await this.saveToken(id, ref)
            return {

                refresh_token: ref_token,
                access_token: acc
            }
        } catch (e) {
            throw e
        }

    }

    async saveToken(userId, refreshToken) {
        try {
            const user = await this.usersService.findOneById(userId)
            const hasToken = await this.tokensRepository.findOne({
                where: {
                    user: {
                        id: userId
                    }
                }
            })
            if (!hasToken) {
                const token = this.tokensRepository.create({refresh_token: refreshToken})
                token.user = user
                await this.tokensRepository.save(token)
                return refreshToken
            }
            console.log(hasToken.refresh_token)
            return hasToken.refresh_token


        } catch (e) {
            throw e
        }


    }

    async generateAccessTokens(payLoad) {

        try {
            const accessToken = this.jwtService.sign(payLoad, {expiresIn: "1d", secret: process.env.JWT_ACCESS_SECRET})

            return accessToken;
        } catch (e) {
            throw e
        }
    }


    async generateRefreshTokens(payLoad) {
        try {
            const refreshToken = this.jwtService.sign(payLoad, {
                expiresIn: "60d",
                secret: process.env.JWT_REFRESH_SECRET
            })
            return refreshToken;
        } catch (e) {
            throw e
        }

    }


    validationAccessToken(accessToken) {
        try {
            const userData = this.jwtService.verify(accessToken, {secret: process.env.JWT_ACCESS_SECRET})
            return userData
        } catch (e) {
            throw e
        }
    }

    validationRefreshToken(refreshToken) {
        try {

            const userData = this.jwtService.verify(refreshToken, {secret: process.env.JWT_REFRESH_SECRET})
            return userData
        } catch (e) {
            throw e

        }
    }


    async findToken(refreshToken) {
        try {
            const tokenData = await this.tokensRepository.findOne({
                where: {
                    refresh_token: refreshToken
                }
            })
            return tokenData
        } catch (e) {
            throw e
        }

    }

    async deleteToken(refreshToken) {
        try {
            await this.tokensRepository.delete({
                refresh_token: refreshToken
            })
            return;
        } catch (e) {
            throw e
        }


    }

}
