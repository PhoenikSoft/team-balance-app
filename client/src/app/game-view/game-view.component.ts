import {Component, Input, OnInit} from '@angular/core';
import {GameProjection} from "../services/group.service";
import {Observable} from "rxjs";
import {GameService} from "../services/game.service";
import {ActivatedRoute} from "@angular/router";
import {UserProjection} from "../services/user.service";

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.sass']
})
export class GameViewComponent implements OnInit {

  game$: Observable<GameProjection>;

  players$: Observable<UserProjection[]>;

  constructor(gameService: GameService, route: ActivatedRoute) {
    const groupId = +route.snapshot.paramMap.get('groupId');
    const gameId = +route.snapshot.paramMap.get('gameId');
    this.game$ = gameService.fetchGame(groupId, gameId);
    this.players$ = gameService.fetchGamePlayers(groupId, gameId);
  }

  ngOnInit() {
  }

}
