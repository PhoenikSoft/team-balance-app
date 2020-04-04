import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayerDialogViewComponent } from './add-player-dialog-view.component';

describe('AddPlayerDialogViewComponent', () => {
  let component: AddPlayerDialogViewComponent;
  let fixture: ComponentFixture<AddPlayerDialogViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlayerDialogViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlayerDialogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
