import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { NgRedux } from '@angular-redux/store';
import { Logger } from '@nsalaun/ng-logger';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/empty';

import { SachleitendeverfuegungActions } from '../actions/sachleitendeverfuegung-actions';
import { SachleitendeVerfuegungService } from '../../services/sachleitende-verfuegung.service';
import { FormBoxState } from '../states/formbox-state';

@Injectable()
export class SachleitendeverfuegungEpics {
  constructor(
    private log: Logger,
    private slv: SachleitendeVerfuegungService
  ) { }

  toggling = (action: ActionsObservable<any>) => {
    return action.ofType(SachleitendeverfuegungActions.TOGGLE)
      .switchMap(({ payload }, n: number) => {
        return Observable.from(this.slv.toggleVerfuegungspunkt())
          .switchMap(vp => {
            let act;
            if (vp.delete) {
              act = SachleitendeverfuegungActions.DELETE_VERFUEGUNGSPUNKT.started(vp.id);

              return Observable.of(act);
            } else {
              act = SachleitendeverfuegungActions.INSERT_VERFUEGUNGSPUNKT.started(vp);
              const act2 = SachleitendeverfuegungActions.RENUMBER.started({});

              return Observable.concat(Observable.of(act), Observable.of(act2));
            }
          });
      });
  }

  inserting = (action: ActionsObservable<any>, store: NgRedux<FormBoxState>) => {
    return action.ofType(SachleitendeverfuegungActions.INSERT_VERFUEGUNGSPUNKT.started)
      .mergeMap(({ payload }, n: number) => {
        const vp = store.getState().slv.slv.getVerfuegungspunkt(payload.id);
        const binding = this.slv.createObservableFromVerfuegungspunkt(vp);

        const act = SachleitendeverfuegungActions
          .INSERT_VERFUEGUNGSPUNKT.done({ params: payload, result: { id: vp.id, binding: binding } });

        return Observable.of(act);
      });
  }

  deleting = (action: ActionsObservable<any>, store: NgRedux<FormBoxState>) => {
    return action.ofType(SachleitendeverfuegungActions.DELETE_VERFUEGUNGSPUNKT.started)
      .switchMap(({ payload }, n: number) => {
        const vp = store.getState().slv.slv.getVerfuegungspunkt(payload);

        return Observable.from(this.slv.updateVerfuegungspunktText(vp.id, vp.ueberschrift)).
          switchMap(() => {
            return Observable.from(this.slv.removeVerfuegungspunkt(vp.id, vp.binding))
              .switchMap(() => {
                const act = SachleitendeverfuegungActions.DELETE_VERFUEGUNGSPUNKT.done({ params: vp.id, result: vp.id });
                const act2 = SachleitendeverfuegungActions.RENUMBER.started({});

                return Observable.concat(Observable.of(act), Observable.of(act2));
              });
          });
      });
  }

  renumbering = (action: ActionsObservable<any>, store: NgRedux<FormBoxState>) => {
    return action.ofType(SachleitendeverfuegungActions.RENUMBER.started)
      .mergeMap((value: any, n: number) => {
        return this.slv.renumber(store.getState().slv.slv).then(() => {
          const act = SachleitendeverfuegungActions.RENUMBER.done({ params: {}, result: {} });

          return act;
        });
      });
  }
}
