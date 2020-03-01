import { TestBed, async, inject } from '@angular/core/testing';

import { GroupGuard } from './group.guard';

describe('GroupGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupGuard]
    });
  });

  it('should ...', inject([GroupGuard], (guard: GroupGuard) => {
    expect(guard).toBeTruthy();
  }));
});
