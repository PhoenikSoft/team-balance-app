import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GroupService} from '../services/group.service';
import {MatDialogRef} from '@angular/material';
import {AddedGroupProjection} from '../services/dto/group.dto';
import {AddGroupData} from '../add-group-dialog/add-group-dialog.component';
import {FeedbackService} from '../services/feedback.service';
import {AddedFeedbackProjection, AddFeedbackProjection} from '../services/dto/feedback.dto';

@Component({
  selector: 'app-add-feedback-dialog',
  templateUrl: './add-feedback-dialog.component.html',
  styleUrls: ['./add-feedback-dialog.component.sass']
})
export class AddFeedbackDialogComponent implements OnInit {

  formControl: FormGroup; // Validation control

  constructor(private feedbackService: FeedbackService, private dialogRef: MatDialogRef<AddFeedbackDialogComponent>, fb: FormBuilder) {
    this.buildFormValidation(fb);
  }

  ngOnInit() {
  }

  async saveFeedback() {
    const newFeedbackData = Object.assign(new AddFeedbackData(), this.formControl.value);
    this.feedbackService.addFeedback(newFeedbackData).subscribe(
        (data: AddedFeedbackProjection) => this.dialogRef.close(data),
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

  get message() {
    return this.formControl.get('message');
  }

  private buildFormValidation(fb: FormBuilder) {
    this.formControl = fb.group({
      message: fb.control('', [Validators.required])
    });
  }
}

export class AddFeedbackData implements AddFeedbackProjection {
  message: string;
}
