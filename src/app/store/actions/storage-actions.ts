import { Injectable } from '@angular/core';
import actionCreatorFactory, { Action } from 'typescript-fsa';
import { NgRedux } from '@angular-redux/store';
import { FormBoxState } from '../states/formbox-state';

const actionCreator = actionCreatorFactory();

/**
 * Aktionen, die die Verarbeitung der Persönlichen Absenderliste betreffen.
 */
@Injectable()
export class StorageActions {
  static UPDATE_STORAGE_SELECTED = actionCreator.async<any, boolean>('UPDATE_STORAGE_SELECTED');
  static UPDATE_STORAGE_PAL = actionCreator.async<any, boolean>('UPDATE_STORAGE_PAL');

  constructor(private ngRedux: NgRedux<FormBoxState>) { }

  updateSelected(): Action<any> {
    const action = StorageActions.UPDATE_STORAGE_SELECTED.started({});

    return this.ngRedux.dispatch(action);
  }

  updatePAL(): Action<any> {
    const action = StorageActions.UPDATE_STORAGE_PAL.started({});

    return this.ngRedux.dispatch(action);
  }
}
