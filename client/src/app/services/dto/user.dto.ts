export interface UserProjection {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    rating: number;
}

export interface RolesProjection {
    roles: RoleProjection[];
}

export interface RoleProjection {
    id: number;
    name: string;
}

export interface UserDetails {
    id: number;
    username: string;
    roles: RoleProjection[];
}
