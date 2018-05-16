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
  static TOGGLE = actionCreator.async<any, { id: number, text?: string, delete: boolean }>('TOGGLE');

  constructor(private ngRedux: NgRedux<SachleitendeverfuegungState>) { }

  toggle(): Action<any> {
    const action = SachleitendeverfuegungActions.TOGGLE.started({});

    return this.ngRedux.dispatch(action);
  }
}
