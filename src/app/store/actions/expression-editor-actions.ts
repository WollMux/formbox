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
  static NEW = actionCreator.async<{ cmd: string, order: number }, number>('NEW');
  static SAVE = actionCreator.async<{ index: number, cmd: DocumentCommand }, number>('SAVE');
  static DELETE = actionCreator.async<number, number>('DELETE');

  constructor(private ngRedux: NgRedux<FormBoxState>) { }

  init(): Action<any> {
    const action = ExpressionEditorActions.INIT.started({});

    return this.ngRedux.dispatch(action);
  }

  new(cmd: string, order: number): Action<any> {
    const action = ExpressionEditorActions.NEW.started({ cmd: cmd, order: order });

    return this.ngRedux.dispatch(action);
  }

  delete(n: number): Action<any> {
    const action = ExpressionEditorActions.DELETE.started(n);

    return this.ngRedux.dispatch(action);
  }

  select(n: number): Action<any> {
    const action = ExpressionEditorActions.SELECT(n);

    return this.ngRedux.dispatch(action);
  }

  save(n: number, cmd: DocumentCommand): Action<any> {
    const action = ExpressionEditorActions.SAVE.started({ index: n, cmd: cmd });

    return this.ngRedux.dispatch(action);
  }
}
