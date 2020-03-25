import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Moment } from 'moment';
import { TokenStorageService } from './token-storage.service';
import { environment } from './../../environments/environment';
import { GroupsProjection, AddGroupProjection, GroupProjection, AddedGroupProjection, GroupAccessChecks } from './dto/group.dto';
import { GameProjection } from './dto/game.dto';
import { UserProjection } from "./dto/user.dto";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private beEndpoint = `${environment.serverEndpoint}/api`;

  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  fetchGroup(id: number) {
    return this.http.get<GroupProjection>(`${this.beEndpoint}/groups/${id}`);
  }

  addGroup(group: AddGroupProjection) {
    return this.http.post<AddedGroupProjection>(`${this.beEndpoint}/groups`, group);
  }

  fetchCurrentUserGroups() {
    const user = this.tokenService.getUser();
    const params = new HttpParams().set('userId', user.id.toString());
    return this.http.get<GroupsProjection>(`${this.beEndpoint}/groups`, {params});
  }

  addMember(groupRef: string) {
    return this.http.post<GroupProjection>(`${this.beEndpoint}/groups/refs/${groupRef}/members`, null);
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

  checkUserAccessToGroup(groupId: number) {
    return this.http.get<GroupAccessChecks>(`${this.beEndpoint}/groups/${groupId}/accessChecks`);
  }

  checkAdminAccessForGroup(groupId: number) {
    const user = this.tokenService.getUser();
    return user.roles.map(role => role.name).includes('ADMIN_ROLE_' + groupId);
  }

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
  players: UserProjection[];
}
