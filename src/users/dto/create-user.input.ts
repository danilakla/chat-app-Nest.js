import {InputType, Field} from '@nestjs/graphql';
import {IsEmail, IsString,} from "class-validator";

@InputType()
export class CreateUserInput {

    @IsEmail()
    @Field(() => String,)
    email: string;

    @IsString()
    @Field(() => String,)
    password: string;


}
