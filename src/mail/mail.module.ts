import {DynamicModule, Module} from '@nestjs/common';
export const MailKey = 'MailKEy';
import * as nodemailer from 'nodemailer';
@Module({
})
export class MailModule {
    static register(configurationMail): DynamicModule {
        const MailProvider={
            provide: MailKey,
            useFactory: () => {
                const transporter = nodemailer.createTransport(configurationMail);
                return transporter
            },
        }
        return {
            module: MailModule,
            providers: [MailProvider,],
            exports:[MailProvider],
        };
    }
}
