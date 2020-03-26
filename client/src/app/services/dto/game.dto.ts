import { Moment } from 'moment';
import { UserProjection } from "./user.dto";

export interface GameProjection {
    id?: number;
    name: string;
    startDateTime?: Moment;
    players: UserProjection[];
}
