import { ObjectType } from '@nestjs/graphql';
import {Authentication} from "../../authentication/entities/authentication.entity";

@ObjectType()
export class Authorized extends Authentication!{

}
