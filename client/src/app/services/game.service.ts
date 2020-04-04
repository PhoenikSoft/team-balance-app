import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { TokenStorageService } from "./token-storage.service";
import { GameProjection, BalancedTeamsProjection } from "./dto/game.dto";
import { UserProjection } from "./dto/user.dto";

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
    return this.http.get<UserProjection[]>(`${this.beEndpoint}/groups/${groupId}/games/${gameId}/players`);
  }

  removePlayer(groupId: number, gameId: number, playerId: number) {
    return this.http.delete(`${this.beEndpoint}/groups/${groupId}/games/${gameId}/players/${playerId}`);
  }

  balancePlayers(groupId: number, gameId: number) {
    return this.http.get<BalancedTeamsProjection>(`${this.beEndpoint}/groups/${groupId}/games/${gameId}/balancedTeams`);
  }

}
