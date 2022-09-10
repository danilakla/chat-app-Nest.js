import { CreateAuthorizedInput } from './create-authorized.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthorizedInput extends PartialType(CreateAuthorizedInput) {
  @Field(() => Int)
  id: number;
}
