import { Injectable } from '@angular/core';
import actionCreatorFactory, { Action } from 'typescript-fsa';
import { NgRedux } from '@angular-redux/store';
import { Form } from '../../data/forms/form';
import { FormularEditorState } from '../states/formular-editor-state';

const actionCreator = actionCreatorFactory();

/**
 * Aktionen für FormularGui.
 */
@Injectable()
export class FormularGuiActions {
  static FILL_VALUES = actionCreator.async<any, Form>('FILL_VALUES');
  static UPDATE_CONTENT_CONTROL_TEXT = actionCreator<{ text: string, ccid: number }>('UPDATE_CONTENT_CONTROL_TEXT');

  constructor(private ngRedux: NgRedux<FormularEditorState>) { }

  fillValues(): any {
    const action = FormularGuiActions.FILL_VALUES.started({});

    return this.ngRedux.dispatch(action);
  }

  updateContentControlText(text: string, ccid: number): any {
    const action = FormularGuiActions.UPDATE_CONTENT_CONTROL_TEXT({ text: text, ccid: ccid });

    return this.ngRedux.dispatch(action);
  }
}
