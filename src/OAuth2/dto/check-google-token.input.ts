import {InputType, Field} from '@nestjs/graphql';
import { IsNotEmpty, IsString} from "class-validator";

@InputType()
export class CheckGoogleTokenInput {
    @Field(() => String,)
    @IsString()
    @IsNotEmpty()
    token: string;

}
