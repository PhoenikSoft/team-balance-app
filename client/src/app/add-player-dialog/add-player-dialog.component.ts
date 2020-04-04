import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {GroupProjection, MemberProjection} from "../services/dto/group.dto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-player-dialog',
  templateUrl: './add-player-dialog.component.html',
  styleUrls: ['./add-player-dialog.component.sass']
})
export class AddPlayerDialogComponent {

  @Input() groupMembers: MemberProjection[];

  players: MemberProjection[];

  formControl: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddPlayerDialogComponent>, fb: FormBuilder) {
    this.buildFormValidation(fb);
  }

  addPlayers(list) {
    console.log(list.selectedOptions.selected.map(item => item.value))
    this.dialogRef.close(Object.assign(list.selectedOptions.selected.map(item => item.value), this.formControl.value));
  }

  private buildFormValidation(fb: FormBuilder) {
    this.formControl = fb.group({
    });
  }

}

export class GamePlayersList {
  players: MemberProjection[];
}
