import { ObjectType, Field, Int } from '@nestjs/graphql';
import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Users} from "../../users/entities/user.entity";
@Entity()
@ObjectType()
export class Tokens {
  @Field(() => Int,)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String,)
  @Column()
  refresh_token: string;

  @OneToOne(() => Users)
  @JoinColumn()
  user: Users;
}
