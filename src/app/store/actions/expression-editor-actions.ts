import { Injectable } from '@angular/core';
import { Action, actionCreatorFactory } from 'typescript-fsa';
import { NgRedux } from '@angular-redux/store/lib/src';

import { FormBoxState } from '../states/formbox-state';
import { DocumentCommand } from '../states/expression-editor-state';

const actionCreator = actionCreatorFactory('EXPRESSION_EDITOR');

@Injectable()
export class ExpressionEditorActions {
  static INIT = actionCreator.async<any, DocumentCommand[]>('INIT');
  static SELECT = actionCreator<number>('SELECT');
  static NEW = actionCreator<any>('NEW');
  static SAVE = actionCreator<{ index: number, cmd: DocumentCommand }>('SAVE');
  static DELETE = actionCreator<number>('DELETE');

  constructor(private ngRedux: NgRedux<FormBoxState>) { }

  init(): Action<any> {
    const action = ExpressionEditorActions.INIT.started({});

    return this.ngRedux.dispatch(action);
  }

  new(): Action<any> {
    const action = ExpressionEditorActions.NEW({});

    return this.ngRedux.dispatch(action);
  }

  delete(n: number): Action<any> {
    const action = ExpressionEditorActions.DELETE(n);

    return this.ngRedux.dispatch(action);
  }

  select(n: number): Action<any> {
    const action = ExpressionEditorActions.SELECT(n);

    return this.ngRedux.dispatch(action);
  }

  save(n: number, cmd: DocumentCommand): Action<any> {
    const action = ExpressionEditorActions.SAVE({ index: n, cmd: cmd });

    return this.ngRedux.dispatch(action);
  }
}
