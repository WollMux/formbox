import { async, inject, TestBed } from '@angular/core/testing';
import { NgLoggerModule } from '@nsalaun/ng-logger';
import { environment } from '../../../../src/environments/environment';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { ActionsObservable } from 'redux-observable';
import { StorageService } from '../../../../src/app/services/storage.service';
import { MockStorageService } from '../../services/mocks/storage-mock.service';
import { INITIAL_STATE } from '../../../../src/app/store/states/formbox-state';
import configureStore from 'redux-mock-store'; // tslint:disable-line no-implicit-dependencies
import { StorageEpics } from '../../../../src/app/store/middleware/storage-epics';
import { StorageActions } from '../../../../src/app/store/actions/storage-actions';

describe('Storage epics', () => {
  let mockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgLoggerModule.forRoot(environment.loglevel),
        NgReduxModule
      ],
      providers: [
        StorageActions,
        StorageEpics,
        { provide: StorageService, useClass: MockStorageService }
      ]
    });
    mockStore = configureStore();
  });

  it('updating selected', async(inject([StorageEpics], (epics: StorageEpics) => {
    const store = mockStore(INITIAL_STATE);
    const action = StorageActions.UPDATE_STORAGE_SELECTED.started({uid: 'max.mustermann', vorname: 'max', nachname: 'mustermann', id: 1});
    const p = epics.updatingStorageSelected(ActionsObservable.of(action), store);

    p.subscribe(result => {
      expect(result).toEqual({
        type: 'UPDATE_STORAGE_SELECTED_DONE',
        payload: {
          params: {uid: 'max.mustermann', vorname: 'max', nachname: 'mustermann', id: 1},
          result: true
        }
      });
    });
  })));

  it('updating pal', async(inject([StorageEpics], (epics: StorageEpics) => {
    const store = mockStore(INITIAL_STATE);
    const action = StorageActions.UPDATE_STORAGE_PAL.started({});
    const p = epics.updatingStoragePAL(ActionsObservable.of(action), store);

    p.subscribe(result => {
      expect(result).toEqual({
        type: 'UPDATE_STORAGE_PAL_DONE',
        payload: {
          params: {},
          result: true
        }
      });
    });
  })));
});
