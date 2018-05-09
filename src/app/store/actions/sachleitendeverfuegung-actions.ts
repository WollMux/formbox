import { Injectable } from '@angular/core';
import actionCreatorFactory, { Action } from 'typescript-fsa';
import { NgRedux } from '@angular-redux/store';
import { SachleitendeverfuegungState } from '../states/sachleitendeverfuegung-state';

const actionCreator = actionCreatorFactory();

/**
 * Aktionen für Sachleitendeverfuegung.
 */
@Injectable()
export class SachleitendeverfuegungActions {
  // static ACTION = actionCreator<any>('ACTION');

  constructor(private ngRedux: NgRedux<SachleitendeverfuegungState>) { }

  // callAction(): Action<any> {
  //   const action = SachleitendeverfuegungActions.ACTION({});
  //
  //   return this.ngRedux.dispatch(action);
  // }
}
