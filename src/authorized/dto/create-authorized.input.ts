import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthorizedInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
