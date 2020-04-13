import { Component, OnInit, Input } from '@angular/core';
import { GroupService } from '../services/group.service';
import { MatDialog } from '@angular/material';
import { AddGroupDialogComponent, AddGroupData } from '../add-group-dialog/add-group-dialog.component';
import {AddedGroupProjection, AddGroupProjection, GroupsProjection} from '../services/dto/group.dto';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent implements OnInit {

  @Input() groups: GroupsProjection;

  constructor(private groupService: GroupService, private tokenService: TokenStorageService,
              private dialog: MatDialog) { }

  ngOnInit() {
  }

  openAddGroupDialog() {
    const dialogRef = this.dialog.open(AddGroupDialogComponent, {
      width: '280px'
    });

    dialogRef.afterClosed().subscribe((result: AddedGroupProjection) => {
      if (result) {
        this.groups.groups.push(result.group);
      }
    });
  }
}
