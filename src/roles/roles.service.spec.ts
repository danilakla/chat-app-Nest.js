import {Test, TestingModule} from '@nestjs/testing';
import {RolesService} from './roles.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {Roles} from "./entities/role.entity";

describe('RolesService', () => {
    let service: RolesService;
    const mockRolesRepository = {
        create:jest.fn().mockImplementation(dto=>dto),
        save: jest.fn().mockImplementation(dto => Promise.resolve({roleId: 23, role:"User"}))
    }
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RolesService, {
                provide: getRepositoryToken(Roles),
                useValue: mockRolesRepository
            }],
        }).compile();

        service = module.get<RolesService>(RolesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('create role in serive', async () => {
expect(await service.create({role:'Admin'})).toEqual({
    roleId: 23,
    role:'Admin'
})
    });
});
