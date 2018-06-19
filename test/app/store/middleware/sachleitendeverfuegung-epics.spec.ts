import { OfficeService } from '../../../../src/app/services/office.service';
import { async, inject, TestBed } from '@angular/core/testing';
import { environment } from '../../../../src/environments/environment';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { SachleitendeverfuegungActions } from '../../../../src/app/store/actions/sachleitendeverfuegung-actions';
import { SachleitendeverfuegungEpics } from '../../../../src/app/store/middleware/sachleitendeverfuegung-epics';
import { SachleitendeVerfuegungService } from '../../../../src/app/services/sachleitende-verfuegung.service';
import { NgLoggerModule } from '@nsalaun/ng-logger';
import { ActionsObservable } from 'redux-observable';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/takeLast';
import { Observable } from 'rxjs/Observable';
import { SachleitendeVerfuegung } from '../../../../src/app/data/slv/sachleitende-verfuegung';
import { FormBoxState, INITIAL_STATE } from '../../../../src/app/store/states/formbox-state';
import { OfficeMockService } from '../../../../src/app/services/mocks/office.mock.service';

describe('Sachleitende Verfuegung epics', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgLoggerModule.forRoot(environment.loglevel),
        NgReduxModule
      ],
      providers: [
        SachleitendeverfuegungActions,
        SachleitendeverfuegungEpics,
        SachleitendeVerfuegungService,
        { provide: OfficeService, useClass: OfficeMockService }
      ]
    });
  });

  it('toggle on Verfuegungspunkt',
    async(inject([SachleitendeverfuegungEpics, SachleitendeVerfuegungService],
      (epics: SachleitendeverfuegungEpics, service: SachleitendeVerfuegungService) => {
        const spy = spyOn(service, 'toggleVerfuegungspunkt').and.returnValue(Promise.resolve({ id: 1, text: 'SLV 1', delete: false }));

        const action = SachleitendeverfuegungActions.TOGGLE({});
        const p = epics.toggling(ActionsObservable.of(action));

        p.scan((arr, value) => [...arr, value], [])
          .takeLast(1)
          .subscribe(result => {
            expect(spy).toHaveBeenCalled();
            expect(result[0]).toEqual({ type: 'INSERT_VERFUEGUNGSPUNKT_STARTED', payload: { id: 1, text: 'SLV 1', delete: false } });
            expect(result[1]).toEqual({ type: 'RENUMBER_STARTED', payload: {} });
          });
      }
    )));

  it('toggle off Verfuegungspunkt',
    async(inject([SachleitendeverfuegungEpics, SachleitendeVerfuegungService],
      (epics: SachleitendeverfuegungEpics, service: SachleitendeVerfuegungService) => {
        const spy = spyOn(service, 'toggleVerfuegungspunkt').and.returnValue(Promise.resolve({ id: 1, text: 'SLV 1', delete: true }));

        const action = SachleitendeverfuegungActions.TOGGLE({});
        const p = epics.toggling(ActionsObservable.of(action));

        p.subscribe(result => {
          expect(spy).toHaveBeenCalled();
          expect(result).toEqual({ type: 'DELETE_VERFUEGUNGSPUNKT_STARTED', payload: 1 });
        });
      }
    )));

  it('delete Verfuegungspunkt',
    async(inject([SachleitendeverfuegungEpics, SachleitendeVerfuegungService, NgRedux],
      (epics: SachleitendeverfuegungEpics, service: SachleitendeVerfuegungService, store: NgRedux<FormBoxState>) => {
        const action = SachleitendeverfuegungActions.DELETE_VERFUEGUNGSPUNKT.started(1);
        const state = INITIAL_STATE;
        const slv = new SachleitendeVerfuegung();
        state.slv.slv = slv;
        slv.addVerfuegungspunkt(1, 'Test', 'Binding1');
        const spy = spyOn(store, 'getState').and.returnValue(state);

        const p = epics.deleting(ActionsObservable.of(action), store);

        p.scan((arr, value) => [...arr, value], [])
          .takeLast(1)
          .subscribe(result => {
            expect(spy).toHaveBeenCalled();
            expect(result[0]).toEqual({ type: 'DELETE_VERFUEGUNGSPUNKT_DONE', payload: { params: 1, result: 1 } });
            expect(result[1]).toEqual({ type: 'RENUMBER_STARTED', payload: {} });
          });
      }
    )));

});
