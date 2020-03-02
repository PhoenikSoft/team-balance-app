import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-group-dialog',
  templateUrl: './add-group-dialog.component.html',
  styleUrls: ['./add-group-dialog.component.sass']
})
export class AddGroupDialogComponent implements OnInit {

  formControl: FormGroup; // Validation control

  constructor(private dialogRef: MatDialogRef<AddGroupDialogComponent>, fb: FormBuilder) {
    this.buildFormValidation(fb);
  }

  ngOnInit() {
  }
  
  saveGroup() {
    this.dialogRef.close(Object.assign(new AddGroupData(), this.formControl.value));
  }

  get name() {
    return this.formControl.get('name');
  }

  private buildFormValidation(fb: FormBuilder) {
    this.formControl = fb.group({
      name: fb.control('', [Validators.required])
    });
  }
}

export class AddGroupData {
  name: string;
}
