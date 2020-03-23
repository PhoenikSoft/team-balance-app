import { Component, OnInit, Input } from '@angular/core';
import { GroupsProjection } from '../services/dto/group.dto';

@Component({
  selector: 'app-your-groups',
  templateUrl: './your-groups.component.html',
  styleUrls: ['./your-groups.component.sass']
})
export class YourGroupsComponent implements OnInit {

  @Input() groups: GroupsProjection;

  constructor() { }

  ngOnInit() {
  }

}
