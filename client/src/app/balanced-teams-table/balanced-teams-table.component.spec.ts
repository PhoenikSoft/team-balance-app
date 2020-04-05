import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancedTeamsTableComponent } from './balanced-teams-table.component';

describe('BalancedTeamsTableComponent', () => {
  let component: BalancedTeamsTableComponent;
  let fixture: ComponentFixture<BalancedTeamsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalancedTeamsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancedTeamsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
