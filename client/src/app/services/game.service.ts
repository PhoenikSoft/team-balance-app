import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import { GameProjection } from "./group.service";
import { UserProjection } from "./dto/user.dto";
import { GroupProjection } from "./dto/group.dto";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private beEndpoint = `${environment.serverEndpoint}/api`;

  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  fetchGame(groupId: number, gameId: number) {
    return this.http.get<GameProjection>(`${this.beEndpoint}/groups/${groupId}/games/${gameId}`);
  }

  fetchGamePlayers(groupId: number, gameId: number) {
    const user = this.tokenService.getUser();
    const params = new HttpParams().set('userId', user.id.toString());
    return this.http.get<UserProjection[]>(`${this.beEndpoint}/groups/${groupId}/games/${gameId}/players`, { params });
  }

  removePlayer(groupId: number, gameId: number, playerId: number) {
    return this.http.delete(`${this.beEndpoint}/groups/${groupId}/games/${gameId}/players/${playerId}`);
  }

}

export interface GamesProjection {
  games: GroupProjection[];
}
