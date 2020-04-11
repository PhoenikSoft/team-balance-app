import {Component, Input, OnInit} from '@angular/core';
import {BalancedTeamsProjection, GameProjection} from '../services/dto/game.dto';
import {GameService} from '../services/game.service';
import {ActivatedRoute} from '@angular/router';
import {UserProjection} from '../services/dto/user.dto';
import {MatDialog} from '@angular/material/dialog';
import {AddPlayerDialogViewComponent} from '../add-player-dialog-view/add-player-dialog-view.component';
import {GamePlayersList} from '../add-player-dialog/add-player-dialog.component';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.sass']
})
export class GameDetailsComponent implements OnInit {

  readonly minPlayersForBalancing = 3;

  @Input() game: GameProjection;

  groupId: number;

  balancedTeams: BalancedTeamsProjection;

  constructor(private gameService: GameService, private route: ActivatedRoute, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.groupId = +this.route.snapshot.paramMap.get('groupId');
    this.balancedTeams = this.game.balancedTeams;
  }

  async removePlayer(player: UserProjection) {
    return this.gameService.removePlayer(this.groupId, this.game.id, player.id).toPromise()
      .then(() => {
              this.game.players = this.game.players.filter(m => m.id !== player.id);
              this.balancedTeams = null;
            }, err => console.error('Cannot remove player', err));
  }

  async balanceTeams() {
    return this.gameService.balancePlayers(this.groupId, this.game.id).toPromise()
      .then(balanceTeamsProjection => this.balancedTeams = balanceTeamsProjection,
        err => console.error('Cannot balance players', err));
  }

  openAddPlayerDialog() {
    const dialogRef = this.dialog.open(AddPlayerDialogViewComponent, {
      width: '300px',
      data: {groupId : this.groupId, currentPlayers: this.game.players}
    });

    dialogRef.afterClosed().subscribe((result: UserProjection[]) => {
      if (result) {
        const playersList: GamePlayersList = new GamePlayersList(result.map(value => value.id));
        this.gameService.addPlayers(this.groupId, this.game.id, playersList).toPromise()
          .then((newPlayers: UserProjection[]) => this.game.players = newPlayers,
            err => console.error('Cannot add players', err));
      }
    });
  }

  get isBalanceTeamsButtonsDisabled() {
    return this.game.players.length < this.minPlayersForBalancing;
  }
}
