import { TestBed, inject } from '@angular/core/testing';

import { StorageServiceService } from './storage.service';

describe('StorageServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageServiceService]
    });
  });

  it('should be created', inject([StorageServiceService], (service: StorageServiceService) => {
    expect(service).toBeTruthy();
  }));
});
