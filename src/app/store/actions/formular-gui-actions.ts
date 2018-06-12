import { Injectable } from '@angular/core';
import actionCreatorFactory, { Action } from 'typescript-fsa';
import { NgRedux } from '@angular-redux/store';
import { Form } from '../../data/forms/form';
import { Control } from '../../data/forms/control';
import { FormularEditorState } from '../states/formular-editor-state';

const actionCreator = actionCreatorFactory();

/**
 * Aktionen für FormularGui.
 */
@Injectable()
export class FormularGuiActions {
  static INIT_BINDINGS = actionCreator.async<any, {}>('INIT_BINDINGS');
  static FILL_VALUES = actionCreator.async<any, Form>('FILL_VALUES');
  static UPDATE_CC_TEXT = actionCreator<{ text: string, ccid: number }>('UPDATE_CC_TEXT');

  constructor(private ngRedux: NgRedux<FormularEditorState>) { }

  fillValues(): any {
    const action = FormularGuiActions.FILL_VALUES.started({});

    return this.ngRedux.dispatch(action);
  }

  updateCCText(text: string, ccid: number): any {
    const action = FormularGuiActions.UPDATE_CC_TEXT({ text: text, ccid: ccid });

    return this.ngRedux.dispatch(action);
  }
}
