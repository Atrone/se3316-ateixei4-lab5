import { TestBed } from '@angular/core/testing';

import { GetOneService } from './get-one.service';

describe('GetOneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetOneService = TestBed.get(GetOneService);
    expect(service).toBeTruthy();
  });
});
