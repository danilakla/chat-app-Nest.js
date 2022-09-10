import {InputType, Field} from '@nestjs/graphql';
import {Column} from "typeorm";
import {IsAlpha, IsString} from "class-validator";

@InputType()
export class CreateRoleInput {
    @Field(() => String,)
    @IsString()
    @IsAlpha()
    @Column()
    role: string;
}
