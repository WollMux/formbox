import { Injectable } from '@angular/core';
import { Action, actionCreatorFactory } from 'typescript-fsa/lib';
import { NgRedux } from '@angular-redux/store';

import { FormBoxState } from '../states/formbox-state';

const actionCreator = actionCreatorFactory('EXPRESSION_OVERRIDE_FRAG_EDITOR');

@Injectable()
export class ExpressionOverrideFragActions {
  static ADD = actionCreator<{}>('ADD');
  static UPDATE_OLDFRAG = actionCreator<{ n: number, oldFrag: string }>('UPDATE_OLD_FRAG');
  static UPDATE_NEWFRAG = actionCreator<{ n: number, oldFrag: string }>('UPDATE_NEW_FRAG');
  static DELETE = actionCreator<number>('DELETE');
  static CLEAR = actionCreator<any>('CLEAR');

  constructor(private ngRedux: NgRedux<FormBoxState>) { }

  add(): Action<any> {
    const action = ExpressionOverrideFragActions.ADD({});

    return this.ngRedux.dispatch(action);
  }

  delete(n: number): Action<any> {
    const action = ExpressionOverrideFragActions.DELETE(n);

    return this.ngRedux.dispatch(action);
  }

  updateOldFrag(n: number, oldFrag: string): Action<any> {
    const action = ExpressionOverrideFragActions.UPDATE_OLDFRAG({ n: n, oldFrag: oldFrag });

    return this.ngRedux.dispatch(action);
  }

  updateNewFrag(n: number, newFrag: string): Action<any> {
    const action = ExpressionOverrideFragActions.UPDATE_NEWFRAG({ n: n, oldFrag: newFrag });

    return this.ngRedux.dispatch(action);
  }

  clear(): Action<any> {
    const action = ExpressionOverrideFragActions.CLEAR({});

    return this.ngRedux.dispatch(action);
  }
}
