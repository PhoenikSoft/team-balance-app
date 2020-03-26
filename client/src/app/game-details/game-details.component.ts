import {Component, Input, OnInit} from '@angular/core';
import {GameProjection} from "../services/dto/game.dto";
import {GameService} from "../services/game.service";
import {ActivatedRoute} from "@angular/router";
import {UserProjection} from "../services/dto/user.dto";

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.sass']
})
export class GameDetailsComponent implements OnInit {

  @Input() game: GameProjection;

  groupId: number;

  constructor(private gameService: GameService, private route: ActivatedRoute) {
    this.groupId = +route.snapshot.paramMap.get('groupId');
  }

  async removePlayer(player: UserProjection) {
    return this.gameService.removePlayer(this.groupId, this.game.id, player.id).toPromise()
      .then(() => this.game.players = this.game.players.filter(m => m.id !== player.id),
        err => console.error('Cannot remove player', err));
  }

  ngOnInit() {
  }

}
