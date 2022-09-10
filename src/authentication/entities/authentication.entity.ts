import {ObjectType, Field} from '@nestjs/graphql';
import {Users} from "../../users/entities/user.entity";

@ObjectType()
export class Authentication {

    @Field(() => String)
    access_token: string;
    @Field(() => String)
    refresh_token: string;

    @Field(() => Users)
    user: Users;
}
