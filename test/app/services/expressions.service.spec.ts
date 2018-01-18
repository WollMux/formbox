import { TestBed, inject } from '@angular/core/testing';

import { ExpressionsService } from './expressions.service';

describe('ExpressionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpressionsService]
    });
  });

  it('should be created', inject([ExpressionsService], (service: ExpressionsService) => {
    expect(service).toBeTruthy();
  }));
});
