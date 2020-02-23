import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupsProjection, GroupService } from '../services/group.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent implements OnInit {

  groups$: Observable<GroupsProjection>;

  constructor(groupService: GroupService) {
    this.groups$ = groupService.fetchCurrentUserGroups();
  }

  ngOnInit() {
  }

}
