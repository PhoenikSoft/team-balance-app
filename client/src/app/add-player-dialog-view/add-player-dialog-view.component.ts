import {Component, Inject, OnInit, Optional} from '@angular/core';
import {Observable} from 'rxjs';
import {GroupService} from '../services/group.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserProjection} from '../services/dto/user.dto';

@Component({
  selector: 'app-add-player-dialog-view',
  templateUrl: './add-player-dialog-view.component.html',
  styleUrls: ['./add-player-dialog-view.component.sass']
})
export class AddPlayerDialogViewComponent implements OnInit {

  $groupMembers: Observable<UserProjection[]>;

  currentPlayers: UserProjection[];

  constructor(
    public dialogRef: MatDialogRef<AddPlayerDialogViewComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    groupService: GroupService
  ) {
    this.$groupMembers = groupService.fetchGroupMembers(data.groupId);
    this.currentPlayers = data.currentPlayers;
  }

  ngOnInit() {
  }

}
