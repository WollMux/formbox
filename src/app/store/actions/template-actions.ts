import { Injectable } from '@angular/core';
import actionCreatorFactory, { Action } from 'typescript-fsa';
import { NgRedux } from '@angular-redux/store';
import { FormBoxState } from '../states/formbox-state';

const actionCreator = actionCreatorFactory();

// tslint:disable:interface-over-type-literal
export type OverrideFrag = { fragId: string, newFragId: string };
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

  static INSERT_FRAGMENTS = actionCreator<any>('INSERT_FRAGMENTS');
  static INSERT_FRAGMENT = actionCreator.async<{ id: number, name: string }, number>('INSERT_FRAGMENT');
  static OVERRIDE_FRAGMENT = actionCreator<OverrideFrag>('OVERRIDE_FRAGMENT');

  static COLLECT_COMMANDS = actionCreator.async<any, DocumentCommand[]>('COLLECT_COMMANDS');
  static EXECUTE_COMMAND = actionCreator.async<DocumentCommand, any>('EXECUTE_COMMAND');

  constructor(private ngRedux: NgRedux<FormBoxState>) { }

  loadTemplate(name: string): Action<string> {
    const action = TemplateActions.LOAD_TEMPLATE.started(name);

    return this.ngRedux.dispatch(action);
  }

  insertFragment(id: number, name: string): Action<{ id: number, name: string }> {
    const action = TemplateActions.INSERT_FRAGMENT.started({ id: id, name: name });

    return this.ngRedux.dispatch(action);
  }

  overrideFragment(fragId: string, newFragId: string): Action<OverrideFrag> {
    const action = TemplateActions.OVERRIDE_FRAGMENT({ fragId: fragId, newFragId: newFragId });

    return this.ngRedux.dispatch(action);
  }
}
