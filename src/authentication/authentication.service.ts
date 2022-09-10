import {BadRequestException, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {CreateUserInput} from "../users/dto/create-user.input";
import {TokensService} from "../tokens/tokens.service";
import {UsersService} from "../users/users.service";
import {GmailService} from "../gmail/gmail.service";
import {IORedisKey} from "../redis/redis.module";
import IORedis from "ioredis";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthenticationService {
    constructor(private tokensService: TokensService,
                private usersService: UsersService,
                private gmailService: GmailService,
                @Inject(IORedisKey) private readonly redisService: IORedis) {
    }


    async login({email, password}) {

        const user = await this.usersService.findOneByEmail(email)
        if (!user) {
            throw new BadRequestException()
        }
        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) {
            throw new BadRequestException()
        }
        const tokens = await this.tokensService.initializationTokens(user)
        return {
            ...tokens,
            user
        }


    }

    async registration({email, password}: CreateUserInput) {

        const emailAlreadyExists = await this.usersService.findOneByEmail(email);

        if (emailAlreadyExists) {
            throw new HttpException('user with such email already exists', HttpStatus.BAD_REQUEST)
        }
        const user = await this.usersService.create({email, password})

        await this.gmailService.sendVerificationEmail(email)
        const tokens = await this.tokensService.initializationTokens(user)
        return {
            ...tokens,
            user
        }


    }

    async activeByToken(activationToken) {
        const user = await this.verifyUserVieToken(activationToken)
        user.isActive = true
        await this.usersService.save(user);
        return 'user is activated'
    }

    async updatePassword(activationToken, password) {
        const user = await this.verifyUserVieToken(activationToken)
        user.password = await bcrypt.hash(password, 5);
        await this.usersService.save(user)
        return 'password was updated'


    }


    async getResetTokenPassword(email) {
        const user = await this.usersService.findOneByEmail(email)
        if (!user) {
            throw new BadRequestException()
        }
        const resetToken = await this.gmailService.sendResetPasswordEmail(email)
        return resetToken;
    }


    private async verifyUserVieToken(activationToken) {
        const email = await this.redisService.get(activationToken)
        if (!email) {
            throw new BadRequestException()
        }
        await this.redisService.del(activationToken)
        const user = await this.usersService.findOneByEmail(email)
        return user
    }

}

