import { Component, Input, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { GroupService } from '../services/group.service';
import { MatDialog } from '@angular/material/dialog';
import { AddGameDialogComponent, AddGameData } from '../add-game-dialog/add-game-dialog.component';
import { GroupProjection, MemberProjection } from '../services/dto/group.dto';
import { GameProjection } from '../services/dto/game.dto';
import { TokenStorageService } from '../services/token-storage.service';
import { UserDetails } from '../services/dto/user.dto';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.sass']
})
export class GroupDetailsComponent implements OnInit {

  @Input() group: GroupProjection;

  isAdmin: boolean;
  currentUser: UserDetails;
  addMemberUri: string;

  constructor(private groupService: GroupService, private tokenService: TokenStorageService, private dialog: MatDialog, private location: PlatformLocation) {
  }

  ngOnInit() {
    this.isAdmin = this.groupService.checkAdminAccessForGroup(this.group.id);
    this.currentUser = this.tokenService.getUser();
    const domain = this.location.href.replace(this.location.pathname, '');
    this.addMemberUri = `${domain}/groups/addMe/${this.group.ref}`;
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

  notCurrentUser(member: MemberProjection) {
    return member.id !== this.currentUser.id;
  }
}
