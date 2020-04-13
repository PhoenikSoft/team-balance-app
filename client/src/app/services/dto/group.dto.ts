import { UserProjection } from './user.dto';
import { GameProjection } from './game.dto';


export interface AddedGroupProjection {
    group: GroupProjection;
}

export interface AddGroupProjection {
    name: string;
}

export interface GroupProjection {
    id: number;
    name: string;
    ref: string;
    members: UserProjection[];
    games: GameProjection[];
}

export interface GroupsProjection {
    groups: GroupProjection[];
}

export interface GroupAccessChecks {
    canAccess: boolean;
}
