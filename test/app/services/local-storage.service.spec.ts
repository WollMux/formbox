import { inject, TestBed } from '@angular/core/testing';
import { LocalStorageService } from '../../../src/app/services/local-storage.service';
import { DexieStorage } from '../../../src/app/storage/dexie-storage';
import { NgLoggerModule } from '@nsalaun/ng-logger';
import { environment } from '../../../src/environments/environment';

describe('LocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgLoggerModule.forRoot(environment.loglevel)],
      providers: [DexieStorage, LocalStorageService]
    });
  });

  it('should be created', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service).toBeTruthy();
  }));

});
