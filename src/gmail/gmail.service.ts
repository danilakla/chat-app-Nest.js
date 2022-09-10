import {Inject, Injectable} from '@nestjs/common';
import {IORedisKey} from "../redis/redis.module";
import IORedis from "ioredis";
import * as nodemailer from 'nodemailer';
import * as uuid from 'uuid'
import {MailKey} from "../mail/mail.module";


@Injectable()
export class GmailService {
    constructor(@Inject(MailKey) private readonly mailService: nodemailer,
                @Inject(IORedisKey) private readonly redisService: IORedis) {
    }

    private sendEmail(to, subject, html) {

        this.mailService.sendMail({
            from: process.env.USER_EMAIL,
            to,
            subject,
            html
        })
    }

    async sendVerificationEmail(email) {
        try {
            const verificationToken = await this.setTokenInEmail(email)

            const verifyEmail = `${process.env.SERVER_URL}/auth/verify-email/${verificationToken}`;

            const message = `<p>Please confirm your email by clicking on the following link : 
                                 <a href="${verifyEmail}">Verify Email</a> </p>`;

            return this.sendEmail(email, 'Activation user\'s account', message)
        } catch (e) {
            throw e
        }

    }

    async sendResetPasswordEmail(email) {
        try {
            const verificationToken = await this.setTokenInEmail(email)
            const resetURL = `${process.env.CLIENT_URL}/reset-password/${verificationToken}`;
            const message = `<p>Please reset password by clicking on the following link : 
  <a href="${resetURL}">Reset Password</a></p>`;

            this.sendEmail(email, 'Reset user\'s password', message)
            return verificationToken
        } catch (e) {
            throw e
        }

    }

    private async setTokenInEmail(email) {
        try {
            const verificationToken = uuid.v4();
            await this.redisService.set(`${verificationToken}`, email, "EX", 3600)
            return verificationToken
        } catch (e) {
            throw e
        }

    }
}
