import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGameDialogComponent } from './add-game-dialog.component';
import { MaterialModule } from '../material/material.module';

describe('AddGameDialogComponent', () => {
  let component: AddGameDialogComponent;
  let fixture: ComponentFixture<AddGameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGameDialogComponent ],
      imports: [ MaterialModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
