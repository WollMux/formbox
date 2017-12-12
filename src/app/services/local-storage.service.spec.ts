import { TestBed, inject } from '@angular/core/testing';

import { Local.StorageService } from './local.storage.service';

describe('Local.StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Local.StorageService]
    });
  });

  it('should be created', inject([Local.StorageService], (service: Local.StorageService) => {
    expect(service).toBeTruthy();
  }));
});
