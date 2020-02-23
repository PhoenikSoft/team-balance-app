import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Moment } from 'moment';
import { TokenStorageService } from './token-storage.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private beEndpoint = `${environment.serverEndpoint}/api`;

  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  fetchGroup(id: number) {
    return this.http.get<GroupProjection>(`${this.beEndpoint}/groups/${id}`);
  }

  fetchCurrentUserGroups() {
    const user = this.tokenService.getUser();
    const params = new HttpParams().set('userId', user.id.toString());
    return this.http.get<GroupsProjection>(`${this.beEndpoint}/groups`, { params });
  }

  removeMember(groupId: number, memberId: number) {
    return this.http.delete(`${this.beEndpoint}/groups/${groupId}/members/${memberId}`);
  }

  removeGame(groupId: number, gameId: number) {
    return this.http.delete(`${this.beEndpoint}/groups/${groupId}/games/${gameId}`);
  }

  addGame(groupId: number, game: GameProjection) {
    return this.http.post(`${this.beEndpoint}/groups/${groupId}/games`, game);
  }
}

export interface GroupProjection {
  id: number;
  name: string;
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

export interface GameProjection {
  id?: number;
  name: string;
  startDateTime?: Moment;
}
