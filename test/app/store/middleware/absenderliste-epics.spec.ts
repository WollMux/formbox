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

  it('loading Absenderliste', async(inject([AbsenderlisteEpics], (epics: AbsenderlisteEpics) => {
    const action = AbsenderlisteActions.LOAD_ABSENDERLISTE.started({});
    const p = epics.loadingAbsenderliste(ActionsObservable.of(action));

    p.subscribe(result => {
      expect(result).toEqual({
        type: 'LOAD_ABSENDERLISTE_DONE',
        payload: {
          params: {},
          result: [{uid: 'max.mustermann', vorname: 'max', nachname: 'mustermann', id: 1}]
        }
      });
    });
  })));

  it('changing Absender failed', async(inject([AbsenderlisteEpics], (epics: AbsenderlisteEpics) => {
    const store = mockStore(INITIAL_STATE);
    const action = AbsenderlisteActions.CHANGE_ABSENDER.started(1);
    const p = epics.changingAbsender(ActionsObservable.of(action), store);

    p.subscribe(result => {
      expect(result).toEqual({
        type: 'CHANGE_ABSENDER_FAILED',
        payload: {
          params: 1,
          error: 1
        },
        error: true
      });
    });
  })));

  it('changing Absender succussful', async(inject([AbsenderlisteEpics], (epics: AbsenderlisteEpics) => {
    const store = mockStore(INITIAL_STATE);
    store.getState().absenderliste.pal = [{uid: 'max.mustermann', vorname: 'max', nachname: 'mustermann', id: 1}];
    const action = AbsenderlisteActions.CHANGE_ABSENDER.started(1);
    const p = epics.changingAbsender(ActionsObservable.of(action), store);

    p.subscribe(result => {
      expect(result).toEqual({
        type: 'CHANGE_ABSENDER_DONE',
        payload: {
          params: 1,
          result: {uid: 'max.mustermann', vorname: 'max', nachname: 'mustermann', id: 1}
        }
      });
    });
  })));

  it('adding Absender by ID successful', async(inject([AbsenderlisteEpics], (epics: AbsenderlisteEpics) => {
    const store = mockStore(INITIAL_STATE);
    store.getState().ldap.result = [{uid: 'max.mustermann', vorname: 'max', nachname: 'mustermann'}];
    const action = AbsenderlisteActions.ADD_ABSENDER_BY_ID.started(0);
    const p = epics.changingAbsender(ActionsObservable.of(action), store);

    p.subscribe(result => {
      expect(result).toEqual({
        type: 'CHANGE_ABSENDER_BY_ID_DONE',
        payload: {
          params: 1,
          result: {uid: 'max.mustermann', vorname: 'max', nachname: 'mustermann'}
        }
      });
    });
  })));

  it('adding Absender by ID failed', async(inject([AbsenderlisteEpics], (epics: AbsenderlisteEpics) => {
    const store = mockStore(INITIAL_STATE);
    const action = AbsenderlisteActions.ADD_ABSENDER_BY_ID.started(0);
    const p = epics.changingAbsender(ActionsObservable.of(action), store);

    p.subscribe(result => {
      expect(result).toEqual({
        type: 'CHANGE_ABSENDER_BY_ID_FAILED',
        payload: {
          params: 1,
          error: 1
        },
        error: true
      });
    });
  })));
});
