import {Field, Int, ObjectType} from "@nestjs/graphql";
import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Users} from "../../users/entities/user.entity";

@Entity()
@ObjectType()
export class Profile {

  @Field(() => Int,)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  lastname: string;

  @Field(() => String)
  @Column({  nullable: false,
    default: 'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8='})
  image: string;

  @Field(() => Users)
  @OneToOne(() => Users)
  @JoinColumn()
  user: Users;
}