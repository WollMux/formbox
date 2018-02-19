import { inject, TestBed } from '@angular/core/testing';

import { AbsenderlisteService } from '../../../src/app/services/absenderliste.service';
import { NgReduxModule } from '@angular-redux/store';
import { AbsenderlisteActions } from '../../../src/app/store/actions/absenderliste-actions';
import { StorageService } from '../../../src/app/services/storage.service';
import { LocalStorageService } from '../../../src/app/services/local-storage.service';
import { DexieStorage } from '../../../src/app/storage/dexie-storage';
import { NgLoggerModule } from '@nsalaun/ng-logger';
import { environment } from '../../../src/environments/environment';

describe('AbsenderlisteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgReduxModule,
        NgLoggerModule.forRoot(environment.loglevel)
      ],
      providers: [
        DexieStorage,
        AbsenderlisteActions,
        { provide: StorageService, useClass: LocalStorageService },
        AbsenderlisteService
      ]
    });
  });

  it('should be created', inject([AbsenderlisteService], (service: AbsenderlisteService) => {
    expect(service).toBeTruthy();
  }));
});
