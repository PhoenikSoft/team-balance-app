import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {environment} from '../../environments/environment';
import {AddedGroupProjection, AddGroupProjection, GroupAccessChecks, GroupProjection, GroupsProjection} from './dto/group.dto';
import {GameProjection} from './dto/game.dto';
import {RolesProjection, UserDetails, UserProjection} from './dto/user.dto';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private beEndpoint = `${environment.serverEndpoint}/api`;

  constructor(private http: HttpClient, private tokenService: TokenStorageService) {
  }

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

  fetchGroupMembers(groupId: number) {
    return this.http.get<UserProjection[]>(`${this.beEndpoint}/groups/${groupId}/members`);
  }

  checkUserAccessToGroup(groupId: number) {
    return this.http.get<GroupAccessChecks>(`${this.beEndpoint}/groups/${groupId}/accessChecks`);
  }

  checkAdminAccessForGroup(groupId: number) {
    const token = this.tokenService.getToken();
    const jwt = jwt_decode(token);
    const rolesObj = JSON.parse(jwt.roles) as RolesProjection;
    return rolesObj.roles.map(role => role.name).includes('ADMIN_ROLE_' + groupId);
  }
}
