import {Component, Input, OnInit} from '@angular/core';
import {GameProjection, GroupProjection} from "../services/group.service";
import {GameService} from "../services/game.service";

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.sass']
})
export class GameDetailsComponent implements OnInit {

  @Input() game: GameProjection;

  constructor(private gameService: GameService) { }

  ngOnInit() {
  }

}
