import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class DepartmentResolver {

  @Query(() => String)
  hello() {
    return 'GraphQL is working ';
  }

}

