import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourGroupsComponent } from './your-groups.component';

describe('YourGroupsComponent', () => {
  let component: YourGroupsComponent;
  let fixture: ComponentFixture<YourGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
