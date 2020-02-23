import { Component, Input } from '@angular/core';
import { GroupProjection, GroupService, MemberProjection, GameProjection } from '../services/group.service';
import { MatDialog } from '@angular/material/dialog';
import { AddGameDialogComponent, AddGameData } from '../add-game-dialog/add-game-dialog.component';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.sass']
})
export class GroupDetailsComponent {

  @Input() group: GroupProjection;

  constructor(private groupService: GroupService, private dialog: MatDialog) {
  }

  async removeMember(member: MemberProjection) {
    return this.groupService.removeMember(this.group.id, member.id).toPromise()
      .then(() => this.group.members = this.group.members.filter(m => m.id !== member.id),
        err => console.error('Cannot remove member', err));
  }

  async removeGame(game: GameProjection) {
    return this.groupService.removeGame(this.group.id, game.id).toPromise()
      .then(() => this.group.games = this.group.games.filter(g => g.id !== game.id),
        err => console.error('Cannot remove game', err));
  }

  openAddGameDialog() {
    const dialogRef = this.dialog.open(AddGameDialogComponent, {
      width: '280px'
    });

    dialogRef.afterClosed().subscribe((result: AddGameData) => {
      if (result) {
        this.groupService.addGame(this.group.id, result.toGameObj()).toPromise()
          .then((newGame: GameProjection) => this.group.games.push(newGame),
            err => console.error('Cannot add game', err));
      }
    });
  }
}
