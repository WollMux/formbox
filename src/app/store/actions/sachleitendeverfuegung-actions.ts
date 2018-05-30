import { Injectable } from '@angular/core';
import actionCreatorFactory, { Action } from 'typescript-fsa';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { SachleitendeverfuegungState } from '../states/sachleitendeverfuegung-state';

const actionCreator = actionCreatorFactory();

/**
 * Aktionen für Sachleitendeverfuegung.
 */
@Injectable()
export class SachleitendeverfuegungActions {
  static TOGGLE = actionCreator<any>('TOGGLE');
  static INSERT_VERFUEGUNGSPUNKT = actionCreator
    .async<{ id: number, idNext?: number, text: string, binding?: string, delete: boolean }, { id: number, binding?: Observable<string> }>
    ('INSERT_VERFUEGUNGSPUNKT');
  static DELETE_VERFUEGUNGSPUNKT = actionCreator.async<number, number>('DELETE_VERFUEGUNGSPUNKT');
  static RENUMBER = actionCreator.async<any, any>('RENUMBER');

  constructor(private ngRedux: NgRedux<SachleitendeverfuegungState>) { }

  toggle(): Action<any> {
    const action = SachleitendeverfuegungActions.TOGGLE({});

    return this.ngRedux.dispatch(action);
  }

  insertVerfuegungspunkt(id: number, text: string, binding?: string):
    Action<{ id: number, idNext?: number, text: string, binding?: string, delete: boolean }> {
    const action = SachleitendeverfuegungActions.INSERT_VERFUEGUNGSPUNKT.started({ id: id, text: text, delete: false, binding: binding });

    return this.ngRedux.dispatch(action);
  }
}
