import { Injectable } from '@angular/core';
import actionCreatorFactory, { Action } from 'typescript-fsa';
import { NgRedux } from '@angular-redux/store';
import { FormBoxState } from '../states/formbox-state';

const actionCreator = actionCreatorFactory();

// tslint:disable:interface-over-type-literal
export type OverrideFrag = { oldFrag: string, newFrag: string };
export type DocumentCommand = { id: number, cmd: string };

/**
 * Aktionen, die die Verarbeitung von Office-Templates und Fragmenten betreffen.
 */
@Injectable()
export class TemplateActions {
  static ERROR = actionCreator<any>('ERROR');

  static LOAD_TEMPLATE = actionCreator.async<string, any>('LOAD_TEMPLATE');
  static GET_TEMPLATE = actionCreator<string>('GET_TEMPLATE');
  static OPEN_TEMPLATE = actionCreator<string>('OPEN_TEMPLATE');

  static INSERT_FRAGMENT = actionCreator.async<{ id: number, name: string }, number>('INSERT_FRAGMENT');

  static GET_NEXT_COMMAND = actionCreator<any>('GET_NEXT_COMMAND');
  static EXECUTE_COMMAND = actionCreator.async<DocumentCommand, number>('EXECUTE_COMMAND');

  static GET_FRAGMENTS = actionCreator.async<any, string[]>('GET_FRAGMENTS');

  constructor(private ngRedux: NgRedux<FormBoxState>) { }

  loadTemplate(name: string): Action<string> {
    const action = TemplateActions.LOAD_TEMPLATE.started(name);

    return this.ngRedux.dispatch(action);
  }

  insertFragment(id: number, name: string): Action<{ id: number, name: string }> {
    const action = TemplateActions.INSERT_FRAGMENT.started({ id: id, name: name });

    return this.ngRedux.dispatch(action);
  }

  getFragments(): Action<any> {
    const action = TemplateActions.GET_FRAGMENTS.started({});

    return this.ngRedux.dispatch(action);
  }
}
