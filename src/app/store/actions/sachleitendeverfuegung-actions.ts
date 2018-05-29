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
  static TOGGLE = actionCreator<any>('TOGGLE');
  static INSERT_VERFUEGUNGSPUNKT =
  actionCreator<{ id: number, idNext?: number, text: string, binding?: string, delete: boolean }>('INSERT_VERFUEGUNGSPUNKT');
  static DELETE_VERFUEGUNGSPUNKT = actionCreator.async<number, number>('DELETE_VERFUEGUNGSPUNKT');
  static RENUMBER = actionCreator.async<any, any>('RENUMBER');

  constructor(private ngRedux: NgRedux<SachleitendeverfuegungState>) { }

  toggle(): Action<any> {
    const action = SachleitendeverfuegungActions.TOGGLE({});

    return this.ngRedux.dispatch(action);
  }

  insertVerfuegungspunkt(id: number, text: string, binding?: string):
    Action<{ id: number, idNext?: number, text: string, binding?: string, delete: boolean }> {
    const action = SachleitendeverfuegungActions.INSERT_VERFUEGUNGSPUNKT({ id: id, text: text, delete: false, binding: binding });

    return this.ngRedux.dispatch(action);
  }
}
