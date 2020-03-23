import { TestBed, async, inject } from '@angular/core/testing';

import { AddMemberGuardGuard } from './add-member-guard.guard';

describe('AddMemberGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddMemberGuardGuard]
    });
  });

  it('should ...', inject([AddMemberGuardGuard], (guard: AddMemberGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
