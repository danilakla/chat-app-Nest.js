import {InputType, Int, Field} from '@nestjs/graphql';
import {Column} from "typeorm";
import {IsAlpha, IsNumber, IsString} from "class-validator";

@InputType()
export class AddRoleInput {
    @Field(() => String,)
    @IsString()
    @IsAlpha()
    @Column()
    role: string;

    @Field(() => Int,)
    @IsNumber()
    @Column()
    userId: number;
}
