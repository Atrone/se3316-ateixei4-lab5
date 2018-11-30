import { TestBed } from '@angular/core/testing';

import { PostWItemService } from './post-witem.service';

describe('PostWItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostWItemService = TestBed.get(PostWItemService);
    expect(service).toBeTruthy();
  });
});
