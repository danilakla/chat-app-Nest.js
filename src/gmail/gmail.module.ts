import { Module } from '@nestjs/common';
import { GmailService } from './gmail.service';
import {MailModule} from "../mail/mail.module";
import {EMAIL_PASSWORD, USER_EMAIL} from "../../const";

@Module({
  imports:[MailModule.register({
    host: 'smtp.gmail.com',
    post: 587,
    secure: false,
    requireTLS: false,
    auth: {
      user:  USER_EMAIL,
      pass: EMAIL_PASSWORD,
    },
  })],
  providers: [GmailService],
  exports:[GmailService],

})
export class GmailModule {}
