import { Component, OnInit, Input } from '@angular/core';
import { BalancedTeamsProjection, TeamProjection } from '../services/dto/game.dto';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';

@Component({
  selector: 'app-balanced-teams-table',
  templateUrl: './balanced-teams-table.component.html',
  styleUrls: ['./balanced-teams-table.component.sass']
})
export class BalancedTeamsTableComponent implements OnInit {

  private _transformer = (node: TeamNode, level: number) => {
    return {
      expandable: !!node.players && node.players.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.players);
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() { }

  ngOnInit() {
  }

  @Input()
  set balancedTeams(balancedTeams: BalancedTeamsProjection) {
    this.dataSource.data = balancedTeams.teams.map((team, index) => new TeamNode(team, index + 1));
    this.treeControl.expandAll();
  }
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

class TeamNode {
  name: string;
  players?: TeamNode[];

  constructor(team: TeamProjection, teamNumber: number) {
    this.name = 'Team' + teamNumber;
    this.players = [];
    for (const player of team.players) {
      this.players.push({ name: `${player.firstName} ${player.lastName}` });
    }
  }
}
