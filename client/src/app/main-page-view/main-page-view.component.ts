import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupService } from '../services/group.service';
import { GroupsProjection } from '../services/dto/group.dto';

@Component({
  selector: 'app-main-page-view',
  templateUrl: './main-page-view.component.html',
  styleUrls: ['./main-page-view.component.sass']
})
export class MainPageViewComponent implements OnInit {

  groups$: Observable<GroupsProjection>;

  constructor(groupService: GroupService) {
    this.groups$ = groupService.fetchCurrentUserGroups();
  }

  ngOnInit() {
  }

}
