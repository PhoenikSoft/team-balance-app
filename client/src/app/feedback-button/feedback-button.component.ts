import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AddedFeedbackProjection} from '../services/dto/feedback.dto';
import {AddFeedbackDialogComponent} from '../add-feedback-dialog/add-feedback-dialog.component';

@Component({
    selector: 'app-feedback-button',
    templateUrl: './feedback-button.component.html',
    styleUrls: ['./feedback-button.component.sass']
})
export class FeedbackButtonComponent implements OnInit {

    private successFeedbackMsg = 'Feedback added. Thank you!';

    // tslint:disable-next-line:variable-name
    constructor(private dialog: MatDialog, private _snackBar: MatSnackBar) {
    }

    ngOnInit() {
    }

    openAddFeedbackDialog() {
        const dialogRef = this.dialog.open(AddFeedbackDialogComponent, {
            width: '250px'
        });

        dialogRef.afterClosed().subscribe((result: AddedFeedbackProjection) => {
            if (result) {
                this._snackBar.open(this.successFeedbackMsg, null, {
                    duration: 2000,
                });
            }
        });
    }
}
