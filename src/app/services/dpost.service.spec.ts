import { TestBed } from '@angular/core/testing';

import { DpostService } from './dpost.service';

describe('DpostService', () => {
  let service: DpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DpostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
