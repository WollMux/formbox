import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { NgRedux } from '@angular-redux/store';
import { Logger } from '@nsalaun/ng-logger';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/forkJoin';

import { SachleitendeverfuegungActions } from '../actions/sachleitendeverfuegung-actions';
import { SachleitendeVerfuegungService } from '../../services/sachleitende-verfuegung.service';

@Injectable()
export class SachleitendeverfuegungEpics {
  constructor(
    private log: Logger,
    private slv: SachleitendeVerfuegungService
  ) { }

  toggling = (action: ActionsObservable<any>) => {
    return action.ofType(SachleitendeverfuegungActions.TOGGLE.started)
      .mergeMap(({ payload }, n: number) => {
        return this.slv.toggleVerfuegungspunkt().then(vp => {
          const act = SachleitendeverfuegungActions.TOGGLE.done({ params: {}, result: vp });

          return act;
        });
      });
  }
}
