import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Moment } from 'moment';

import * as moment from 'moment';
import { UserProjection } from "../services/user.service";
import { GameProjection } from '../services/dto/game.dto';

@Component({
  selector: 'app-add-game-dialog',
  templateUrl: './add-game-dialog.component.html',
  styleUrls: ['./add-game-dialog.component.sass']
})
export class AddGameDialogComponent {

  formControl: FormGroup; // Validation control

  minDate = moment();

  constructor(private dialogRef: MatDialogRef<AddGameDialogComponent>, fb: FormBuilder) {
    this.buildFormValidation(fb);
  }

  saveGame() {
    this.dialogRef.close(Object.assign(new AddGameData(), this.formControl.value));
  }

  get name() {
    return this.formControl.get('name');
  }

  private buildFormValidation(fb: FormBuilder) {
    this.formControl = fb.group({
      name: fb.control('', [Validators.required]),
      startDate: fb.control(null),
      startTime: fb.control(null)
    });
  }
}

export class AddGameData extends Object {
  name: string;
  startDate: Moment;
  startTime: string;
  players: UserProjection[];

  toGameObj(): GameProjection {
    const result = {
      name: this.name,
      startDateTime: this.startDate,
      players: this.players
    };

    if (result.startDateTime && this.startTime) {
      const hoursWithMinutes = this.startTime.split(':').map(str => +str);
      result.startDateTime.hours(hoursWithMinutes[0]).minutes(hoursWithMinutes[1]);
    }

    return result;
  }
}
