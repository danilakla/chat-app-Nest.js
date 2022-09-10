import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import {Roles} from "../../roles/entities/role.entity";
import {Tokens} from "../../tokens/entities/token.entity";
import * as bcrypt from 'bcryptjs';
import {Profile} from "../../profile/entities/profile.entity";

@ObjectType()
@Entity()
export class Users {


  @Field(() => Int,)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String,)
  @Column()
  email: string;

  @Column()
  password: string;

  @Field(() => Boolean,)
  @Column({default:false})
  isActive: boolean;

  @OneToOne(() => Tokens, (token) => token.user) // specify inverse side as a second parameter
  token: Tokens

  @OneToOne(() => Profile, (prof) => prof.user) // specify inverse side as a second parameter
  profile: Profile


  @ManyToMany(() => Roles, (roles) => roles.users, {
    cascade: true,
  })
  @JoinTable()
  roles: Roles[]


  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 5);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }


}
