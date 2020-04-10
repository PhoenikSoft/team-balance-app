import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserProjection} from '../services/dto/user.dto';

@Component({
  selector: 'app-add-player-dialog',
  templateUrl: './add-player-dialog.component.html',
  styleUrls: ['./add-player-dialog.component.sass']
})
export class AddPlayerDialogComponent implements OnInit{

  @Input() groupMembers: UserProjection[];

  @Input() currentPlayers: UserProjection[];

  playersShowInDialog: UserProjection[] = [];

  selectedPlayers: UserProjection[];

  formControl: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddPlayerDialogComponent>, fb: FormBuilder) {
    this.buildFormValidation(fb);
  }

  ngOnInit(): void {
    for (const groupMember of this.groupMembers) {
      if (!(this.currentPlayers.map(value => value.id).indexOf(groupMember.id) >= 0)) {
        this.playersShowInDialog.push(groupMember);
      }
    }
  }

  addPlayers(list) {
    this.selectedPlayers = list.selectedOptions.selected.map(item => item.value);
    this.dialogRef.close(this.selectedPlayers);
  }

  private buildFormValidation(fb: FormBuilder) {
    this.formControl = fb.group({
    });
  }

}

export class GamePlayersList {
  players: number[];

  constructor(players: number[]) {
    this.players = players;
  }
}
