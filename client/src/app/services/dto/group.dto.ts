import { UserProjection } from './user.dto';
import { GameProjection } from './game.dto';


export interface AddedGroupProjection {
    group: GroupProjection;
    updatedUser: UserProjection;
}

export interface AddGroupProjection {
    name: string;
}

export interface GroupProjection {
    id: number;
    name: string;
    ref: string;
    members: MemberProjection[];
    games: GameProjection[];
}

export interface GroupsProjection {
    groups: GroupProjection[];
}

export interface MemberProjection {
    id: number;
    firstName: string;
    lastName: string;
}

export interface GroupAccessChecks {
    canAccess: boolean;
}
