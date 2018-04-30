import { async, inject, TestBed } from '@angular/core/testing';

import { AbsenderlisteService } from '../../../src/app/services/absenderliste.service';
import { NgReduxModule } from '@angular-redux/store';
import { AbsenderlisteActions } from '../../../src/app/store/actions/absenderliste-actions';
import { StorageService } from '../../../src/app/services/storage.service';
import { NgLoggerModule } from '@nsalaun/ng-logger';
import { environment } from '../../../src/environments/environment';
import { MockStorageService } from './mocks/storage-mock.service';
import { Absender } from '../../../src/app/storage/absender';

describe('AbsenderlisteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgReduxModule,
        NgLoggerModule.forRoot(environment.loglevel)
      ],
      providers: [
        AbsenderlisteActions,
        { provide: StorageService, useClass: MockStorageService },
        AbsenderlisteService
      ]
    });
  });

  it('loadAbsenderliste', async(inject([AbsenderlisteService], (service: AbsenderlisteService) => {
    service.loadAbsenderliste().then(result => {
      expect(result).toEqual([{uid: 'max.mustermann', vorname: 'max', nachname: 'mustermann', id: 1} as Absender]);
    });
  })));

  it('loadAbsender', async(inject([AbsenderlisteService], (service: AbsenderlisteService) => {
    service.loadAbsender().then(result => {
      expect(result).toEqual(1);
    });
  })));
});
