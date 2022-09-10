import {Roles} from "../../roles/entities/role.entity";

export class CreatePayloadTokens {
    id: number;
    email: string;
    roles: Roles;
}