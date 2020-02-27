import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {GameProjection, GroupProjection, GroupsProjection} from "./group.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private beEndpoint = `${environment.serverEndpoint}/api`;

  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  fetchGame(groupId: number, gameId: number) {
    return this.http.get<GameProjection>(`${this.beEndpoint}/groups/${groupId}/games/${gameId}`);
  }

  fetchGamePlayers() {
    const user = this.tokenService.getUser();
    const params = new HttpParams().set('userId', user.id.toString());
    return this.http.get<GamesProjection>(`${this.beEndpoint}/games`, { params });
  }

}

export interface GamesProjection {
  games: GroupProjection[];
}
