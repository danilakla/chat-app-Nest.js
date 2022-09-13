import {Test, TestingModule} from '@nestjs/testing';
import {RolesResolver} from './roles.resolver';
import {RolesService} from './roles.service';

describe('RolesResolver', () => {
    let resolver: RolesResolver;
    const mockRolesService = {
        create:jest.fn(dto=>{
            return {
                roleId: Date.now(),
                ...dto
            }
        })
    }
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RolesResolver, RolesService],
        }).overrideProvider(RolesService).useValue(mockRolesService).compile();

        resolver = module.get<RolesResolver>(RolesResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    it('create role', () => {
        expect(resolver.createRole({role: "Admin"})).toEqual({
            roleId: expect.anything(),
            role: 'Admin'
        });
    });
});
