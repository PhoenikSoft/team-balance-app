import { Component } from '@angular/core';
import { GroupService } from '../services/group.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GroupProjection } from '../services/dto/group.dto';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.sass']
})
export class GroupViewComponent {

  group$: Observable<GroupProjection>;

  constructor(groupService: GroupService, route: ActivatedRoute) {
    const groupId = +route.snapshot.paramMap.get('groupId');
    this.group$ = groupService.fetchGroup(groupId);
  }
}
