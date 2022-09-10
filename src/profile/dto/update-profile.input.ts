import { CreateProfileInput } from './create-profile.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import {IsAlpha} from "class-validator";

@InputType()
export class UpdateProfileInput extends PartialType(CreateProfileInput) {
  @Field(() => String)
  name: string;
  @Field(() => String)
  lastname: string;
  @Field(() => String,{ nullable: true })
  image?: string;



}
