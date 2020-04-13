import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {GroupService} from '../services/group.service';
import {AddedGroupProjection, AddGroupProjection} from '../services/dto/group.dto';

@Component({
  selector: 'app-add-group-dialog',
  templateUrl: './add-group-dialog.component.html',
  styleUrls: ['./add-group-dialog.component.sass']
})
export class AddGroupDialogComponent implements OnInit {

  formControl: FormGroup; // Validation control

  constructor(private groupService: GroupService, private dialogRef: MatDialogRef<AddGroupDialogComponent>, fb: FormBuilder) {
    this.buildFormValidation(fb);
  }

  ngOnInit() {
  }

  async saveGroup() {
    const newGroupData = Object.assign(new AddGroupData(), this.formControl.value);
    this.groupService.addGroup(newGroupData).subscribe(
        (data: AddedGroupProjection) => this.dialogRef.close(data),
        err => {
          switch (err.status) {
            case 400:
              Object.entries(err.error.errors).forEach(
                  ([key, value]) => this.formControl.get(key).setErrors({
                          validationErrors: value
                  })
              );
              break;
            default:
              this.formControl.setErrors({
                internalError: true
              });
              break;
          }
        }
    );
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

export class AddGroupData implements AddGroupProjection {
  name: string;
}
