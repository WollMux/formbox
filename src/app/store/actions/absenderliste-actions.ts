import { Injectable } from '@angular/core';
import actionCreatorFactory, { Action } from 'typescript-fsa';
import { NgRedux } from '@angular-redux/store';
import { AbsenderlisteState } from '../states/absender-state';
import { Absender } from '../../storage/absender';

const actionCreator = actionCreatorFactory();

/**
 * Aktionen, die die Verarbeitung der Persönlichen Absenderliste betreffen.
 */
@Injectable()
export class AbsenderlisteActions {
  static CHANGE_ABSENDER = actionCreator.async<number, Absender, number>('CHANGE_ABSENDER');
  static LOAD_ABSENDERLISTE = actionCreator.async<any, Absender[]>('LOAD_ABSENDERLISTE');

  constructor(private ngRedux: NgRedux<AbsenderlisteState>) { }

  changeAbsender(id: number): Action<number> {
    const action = AbsenderlisteActions.CHANGE_ABSENDER.started(id);

    return this.ngRedux.dispatch(action);
  }

  loadAbsenderliste(): Action<any> {
    const action = AbsenderlisteActions.LOAD_ABSENDERLISTE.started({});

    return this.ngRedux.dispatch(action);
  }
}
