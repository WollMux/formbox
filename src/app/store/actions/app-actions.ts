import { Injectable } from '@angular/core';
import actionCreatorFactory, { Action } from 'typescript-fsa';
import { NgRedux } from '@angular-redux/store';

import { FormBoxState } from '../states/formbox-state';

const actionCreator = actionCreatorFactory();

@Injectable()
export class AppActions {
  static CONTINUE = actionCreator<any>('CONTINUE');

  constructor(private ngRedux: NgRedux<FormBoxState>) { }

  continue(): Action<any> {
    const action = AppActions.CONTINUE({});

    return this.ngRedux.dispatch(action);
  }
}
