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

@Injectable()
export class SachleitendeverfuegungEpics {
  constructor(
    private log: Logger,
  ) { }

  // doingSomething = (action: ActionsObservable<any>) => {
  //   return action.ofType(SachleitendeverfuegungActions.ACTION)
  //     .mergeMap(({ payload }, n: number) => {
  //     });
  // }
}
