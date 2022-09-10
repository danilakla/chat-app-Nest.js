import {InputType, Field} from '@nestjs/graphql';
import {IsString} from "class-validator";

@InputType()
export class UpdatePasswordInput {
    @Field(() => String,)
    @IsString()
    token: string;

    @Field(() => String,)
    @IsString()
    password: string;
}
