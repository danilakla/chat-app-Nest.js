import { Module } from '@nestjs/common';
import {GoogleResolver} from "./google/google.resolver";
import {GoogleService} from "./google/google.service";
import {AuthenticationModule} from "../authentication/authentication.module";

@Module({
  providers: [GoogleResolver,GoogleService],
  imports:[AuthenticationModule]
})
export class OAuth2Module {}
