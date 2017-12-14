import { inject, TestBed } from '@angular/core/testing';
import { LocalStorageService } from '../../../src/app/services/local-storage.service';
import { DexieStorage } from '../../../src/app/storage/dexie-storage';

describe('LocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DexieStorage, LocalStorageService]
    });
  });

  it('should be created', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service).toBeTruthy();
  }));

});
