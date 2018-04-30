import { AbsenderlisteService } from '../../../../src/app/services/absenderliste.service';
import { async, inject, TestBed } from '@angular/core/testing';
import { NgLoggerModule } from '@nsalaun/ng-logger';
import { environment } from '../../../../src/environments/environment';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { ActionsObservable } from 'redux-observable';
import { AbsenderlisteEpics } from '../../../../src/app/store/middleware/absenderliste-epics';
import { AbsenderlisteActions } from '../../../../src/app/store/actions/absenderliste-actions';
import { StorageService } from '../../../../src/app/services/storage.service';
import { MockStorageService } from '../../services/mocks/storage-mock.service';
import { INITIAL_STATE } from '../../../../src/app/store/states/formbox-state';
import configureStore from 'redux-mock-store'; // tslint:disable-line no-implicit-dependencies
import { Absender } from '../../../../src/app/storage/absender';

const absender = {uid: 'max.mustermann', vorname: 'max', nachname: 'mustermann', id: 1} as Absender;

describe('Absenderliste epics', () => {
  let mockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgLoggerModule.forRoot(environment.loglevel),
        NgReduxModule
      ],
      providers: [
        AbsenderlisteService,
        AbsenderlisteActions,
        AbsenderlisteEpics,
        { provide: StorageService, useClass: MockStorageService }
      ]
    });
    mockStore = configureStore();
  });

  it('loading AbsenderState', async(inject([AbsenderlisteEpics], (epics: AbsenderlisteEpics) => {
    const action = AbsenderlisteActions.LOAD_ABSENDERSTATE.started({});
    const p = epics.loadingAbsenderState(ActionsObservable.of(action));

    p.subscribe(result => {
      expect(result).toEqual({
        type: 'LOAD_ABSENDERSTATE_DONE',
        payload: {
          params: {},
          result: {
            pal: [absender],
            selected: 1
          }
        }
      });
    });
  })));

  it('changing Absender', inject([AbsenderlisteEpics], (epics: AbsenderlisteEpics) => {
    const store = mockStore(INITIAL_STATE);
    store.getState().absenderliste.pal = [absender];
    const action = AbsenderlisteActions.CHANGE_ABSENDER(1);
    const p = epics.changingAbsender(ActionsObservable.of(action), store);

    p.subscribe(result => {
      expect(result).toEqual({
        type: 'UPDATE_STORAGE_SELECTED_STARTED',
        payload: 1
      });
    });
  }));

  it('saving PAL', inject([AbsenderlisteEpics], (epics: AbsenderlisteEpics) => {
    const store = mockStore(INITIAL_STATE);
    const action = AbsenderlisteActions.ADD_ABSENDER(absender);
    const p = epics.savingPAL(ActionsObservable.of(action), store);

    p.subscribe(result => {
      expect(result).toEqual({
        type: 'UPDATE_STORAGE_PAL_STARTED',
        payload: {}
      });
    });

    const action2 = AbsenderlisteActions.REMOVE_ABSENDER(0);
    const p2 = epics.savingPAL(ActionsObservable.of(action2), store);

    p2.subscribe(result => {
      expect(result).toEqual({
        type: 'UPDATE_STORAGE_PAL_STARTED',
        payload: {}
      });
    });
  }));

});
