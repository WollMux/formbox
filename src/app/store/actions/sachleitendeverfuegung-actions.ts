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
  static TOGGLE = actionCreator<{ abdruck: boolean }>('TOGGLE');
  static PRINT = actionCreator<number[]>('PRINT');
  static INSERT_VERFUEGUNGSPUNKT = actionCreator
    .async<{ id: number, idNext?: number, text: string, binding?: string, delete: boolean, abdruck?: boolean },
    { id: number, binding?: Observable<string> }>('INSERT_VERFUEGUNGSPUNKT');
  static DELETE_VERFUEGUNGSPUNKT = actionCreator.async<number, number>('DELETE_VERFUEGUNGSPUNKT');
  static RENUMBER = actionCreator.async<any, any>('RENUMBER');
  static UPDATE_UEBERSCHRIFT = actionCreator<{ id: number, ueberschrift: string }>('UPDATE_UEBERSCHRIFT');

  constructor(private ngRedux: NgRedux<SachleitendeverfuegungState>) { }

  toggle(): Action<any> {
    const action = SachleitendeverfuegungActions.TOGGLE({ abdruck: false });

    return this.ngRedux.dispatch(action);
  }

  print(copies: number[]): Action<any> {
    const action = SachleitendeverfuegungActions.PRINT(copies);

    return this.ngRedux.dispatch(action);
  }

  insertVerfuegungspunkt(id: number, text: string, binding?: string):
    Action<{ id: number, idNext?: number, text: string, binding?: string, delete: boolean }> {
    const action = SachleitendeverfuegungActions.INSERT_VERFUEGUNGSPUNKT.started({ id: id, text: text, delete: false, binding: binding });

    return this.ngRedux.dispatch(action);
  }

  updateUeberschrift(id: number, ueberschrift: string): Action<any> {
    const action = SachleitendeverfuegungActions.UPDATE_UEBERSCHRIFT({ id, ueberschrift });

    return this.ngRedux.dispatch(action);
  }

  toggleAbdruck(): Action<any> {
    const action = SachleitendeverfuegungActions.TOGGLE({ abdruck: true });

    return this.ngRedux.dispatch(action);
  }
}
