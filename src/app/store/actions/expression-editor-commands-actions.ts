import { Injectable } from '@angular/core';
import { Action, actionCreatorFactory } from 'typescript-fsa';
import { NgRedux } from '@angular-redux/store/lib/src';

import { FormBoxState } from '../states/formbox-state';
import { DocumentCommand } from '../states/expression-editor-commands-state';

const actionCreator = actionCreatorFactory('EXPRESSION_EDITOR_COMMANDS');

@Injectable()
export class ExpressionEditorCommandsActions {
  static INIT = actionCreator.async<any, DocumentCommand[]>('INIT');
  static SELECT = actionCreator<number>('SELECT');
  static NEW = actionCreator.async<{ cmd: string, order: number }, number>('NEW');
  static SAVE = actionCreator.async<{ index: number, cmd: DocumentCommand }, number>('SAVE');
  static DELETE = actionCreator.async<number, number>('DELETE');
  static SHOW_INSERT_FRAG = actionCreator<boolean>('SHOW_INSERT_FRAG');
  static SHOW_OVERRIDE_FRAG = actionCreator<boolean>('SHOW_OVERRIDE_FRAG');

  constructor(private ngRedux: NgRedux<FormBoxState>) { }

  init(): Action<any> {
    const action = ExpressionEditorCommandsActions.INIT.started({});

    return this.ngRedux.dispatch(action);
  }

  new(cmd: string, order: number): Action<any> {
    const action = ExpressionEditorCommandsActions.NEW.started({ cmd: cmd, order: order });

    return this.ngRedux.dispatch(action);
  }

  delete(n: number): Action<any> {
    const action = ExpressionEditorCommandsActions.DELETE.started(n);

    return this.ngRedux.dispatch(action);
  }

  select(n: number): Action<any> {
    const action = ExpressionEditorCommandsActions.SELECT(n);

    return this.ngRedux.dispatch(action);
  }

  save(n: number, cmd: DocumentCommand): Action<any> {
    const action = ExpressionEditorCommandsActions.SAVE.started({ index: n, cmd: cmd });

    return this.ngRedux.dispatch(action);
  }

  showInsertFrag(show = true): Action<boolean> {
    const action = ExpressionEditorCommandsActions.SHOW_INSERT_FRAG(show);

    return this.ngRedux.dispatch(action);
  }

  showOverrideFrag(show = true): Action<boolean> {
    const action = ExpressionEditorCommandsActions.SHOW_OVERRIDE_FRAG(show);

    return this.ngRedux.dispatch(action);
  }

}
