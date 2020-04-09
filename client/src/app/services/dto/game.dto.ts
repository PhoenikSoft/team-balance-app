import { Moment } from 'moment';
import { UserProjection } from './user.dto';

export interface GameProjection {
    id?: number;
    name: string;
    startDateTime?: Moment;
    players: UserProjection[];
}

export interface BalancedTeamsProjection {
    teams: TeamProjection[];
}

export interface TeamProjection {
    players: PlayerProjection[];
}

export interface PlayerProjection {
    id: number;
    firstName: string;
    lastName: string;
    rating: number;
}
