import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import {FileUpload} from "../interface/input-creacre-interface";
import {Field, InputType} from "@nestjs/graphql";
import {IsAlpha} from "class-validator";

@InputType()
export class CreateProfileInput {
  @Field(() => String)
  name: string;
  @Field(() => String)
  lastname: string;
  @Field(() => String,{ nullable: true })
  image?: string;
}