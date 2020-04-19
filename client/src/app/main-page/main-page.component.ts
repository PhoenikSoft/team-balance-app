import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddGroupDialogComponent} from '../add-group-dialog/add-group-dialog.component';
import {AddedGroupProjection, GroupsProjection} from '../services/dto/group.dto';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent implements OnInit {

  @Input() groups: GroupsProjection;

  constructor(private dialog: MatDialog) { }

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
