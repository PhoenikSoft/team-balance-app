import { Moment } from 'moment';

export interface GameProjection {
    id?: number;
    name: string;
    startDateTime?: Moment;
}