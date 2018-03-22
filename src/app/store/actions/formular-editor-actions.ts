import { Injectable } from '@angular/core';
import actionCreatorFactory, { Action } from 'typescript-fsa';
import { NgRedux } from '@angular-redux/store';
import { FormularEditorState } from '../states/formular-editor-state';
import { Form } from '../../data/forms/form';
import { Control } from '../../data/forms/control';

const actionCreator = actionCreatorFactory();

/**
 * Aktionen für FormularEditor.
 */
@Injectable()
export class FormularEditorActions {
  static UPDATE_CONTROL = actionCreator<{control: any, path: string[], key: number}>('UPDATE_CONTROL');
  static REMOVE_CONTROL = actionCreator.async <{id: string, path: string[], key: number, ccid: number}, {}> ('REMOVE_CONTROL');
  static ADD_CONTROL = actionCreator.async<{type: string, path: string[], key: number}, Control>('ADD_CONTROL');
  static MOVE_CONTROL = actionCreator<{control: any, oldPath: string[], oldKey: number, newPath: string[], newKey: number}>('MOVE_CONTROL');
  static LOAD_FORM = actionCreator.async<any, Form>('LOAD_FORM');
  static SAVE_FORM = actionCreator.async<any, string>('SAVE_FORM');
  static CREATE_FORM = actionCreator.async<any, Form>('CREATE_FORM');
  static EDIT_CONTROL = actionCreator<string>('EDIT_CONTROL');
  static HIDE_CONTROL = actionCreator<string>('HIDE_CONTROL');

  constructor(private ngRedux: NgRedux<FormularEditorState>) { }

  edit(id: string): any {
    const action = FormularEditorActions.EDIT_CONTROL(id);

    return this.ngRedux.dispatch(action);
  }

  hide(id: string): any {
    const action = FormularEditorActions.HIDE_CONTROL(id);

    return this.ngRedux.dispatch(action);
  }

  update(control: any, path: string[], key: number): any {
    const action = FormularEditorActions.UPDATE_CONTROL({control, path, key});

    return this.ngRedux.dispatch(action);
  }

  remove(id: string, path: string[], key: number, ccid: number): any {
    const action = FormularEditorActions.REMOVE_CONTROL.started({id, path, key, ccid});

    return this.ngRedux.dispatch(action);
  }

  add(type: string, path: string[], key: number): any {
    const action = FormularEditorActions.ADD_CONTROL.started({type, path, key});

    return this.ngRedux.dispatch(action);
  }

  move(control: any, oldPath: string[], oldKey: number, newPath: string[], newKey: number): any {
    const action = FormularEditorActions.MOVE_CONTROL({control, oldPath, oldKey, newPath, newKey});

    return this.ngRedux.dispatch(action);
  }

  load(): any {
    const action = FormularEditorActions.LOAD_FORM.started({});

    return this.ngRedux.dispatch(action);
  }

  save(): any {
    const action = FormularEditorActions.SAVE_FORM.started({});

    return this.ngRedux.dispatch(action);
  }

  create(): any {
    const action = FormularEditorActions.CREATE_FORM.started({});

    return this.ngRedux.dispatch(action);
  }
}
