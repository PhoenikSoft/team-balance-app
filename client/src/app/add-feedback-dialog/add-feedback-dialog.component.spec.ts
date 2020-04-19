import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeedbackDialogComponent } from './add-feedback-dialog.component';

describe('AddFeedbackDialogComponent', () => {
  let component: AddFeedbackDialogComponent;
  let fixture: ComponentFixture<AddFeedbackDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFeedbackDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeedbackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
