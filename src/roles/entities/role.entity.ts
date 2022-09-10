import { ObjectType, Field, Int } from '@nestjs/graphql';
import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Users} from "../../users/entities/user.entity";
@Entity()
@ObjectType()
export class Roles {

  @Field(() => Int,)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String,)
  @Column({unique:true})
  role: string;

  @Field(() => Users,)
  @ManyToMany(() => Users, (user) => user.roles)
  users: Users[]
}
