import {Component, Input, OnInit} from '@angular/core';
import {GameProjection, GroupProjection, MemberProjection} from "../services/group.service";
import {GameService} from "../services/game.service";
import {UserProjection} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.sass']
})
export class GameDetailsComponent implements OnInit {

  @Input() game: GameProjection;

  constructor(private gameService: GameService, private route: ActivatedRoute) { }

  async removePlayer(player: UserProjection) {
    return this.gameService.removePlayer(+this.route.snapshot.paramMap.get('groupId'), this.game.id, player.id).toPromise()
      .then(() => this.game.players = this.game.players.filter(m => m.id !== player.id),
        err => console.error('Cannot remove player', err));
  }

  ngOnInit() {
  }

}