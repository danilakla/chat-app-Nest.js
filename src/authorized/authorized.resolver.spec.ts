import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizedResolver } from './authorized.resolver';
import { AuthorizedService } from './authorized.service';

describe('AuthorizedResolver', () => {
  let resolver: AuthorizedResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorizedResolver, AuthorizedService],
    }).compile();

    resolver = module.get<AuthorizedResolver>(AuthorizedResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
