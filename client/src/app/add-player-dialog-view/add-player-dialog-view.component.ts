import {Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {Observable} from "rxjs";
import {MemberProjection} from "../services/dto/group.dto";
import {GroupService} from "../services/group.service";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-player-dialog-view',
  templateUrl: './add-player-dialog-view.component.html',
  styleUrls: ['./add-player-dialog-view.component.sass']
})
export class AddPlayerDialogViewComponent implements OnInit {

  $groupMembers: Observable<MemberProjection[]>;

  constructor(
    public dialogRef: MatDialogRef<AddPlayerDialogViewComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    groupService: GroupService
  ) {
    this.$groupMembers = groupService.fetchGroupMembers(data.groupId);
  }

  ngOnInit() {
  }

}
