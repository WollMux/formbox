import { Injectable } from '@angular/core';
import actionCreatorFactory, { Action } from 'typescript-fsa';
import { NgRedux } from '@angular-redux/store';
import { FormBoxState } from '../states/formbox-state';

const actionCreator = actionCreatorFactory();

export type OverrideFrag = { fragId: string, newFragId: string }; // tslint:disable-line:interface-over-type-literal

/**
 * Aktionen, die die Verarbeitung von Office-Templates und Fragmenten betreffen.
 */
@Injectable()
export class TemplateActions {
  static ERROR = actionCreator<any>('ERROR');

  static LOAD_TEMPLATE = actionCreator<string>('LOAD_TEMPLATE');
  static GET_TEMPLATE = actionCreator<string>('GET_TEMPLATE');
  static OPEN_TEMPLATE = actionCreator<string>('OPEN_TEMPLATE');
  static LOAD_TEMPLATE_FINISHED = actionCreator<string>('LOAD_TEMPLATE_FINISHED');

  static INSERT_FRAGMENTS = actionCreator<any>('INSERT_FRAGMENTS');
  static INSERT_FRAGMENT = actionCreator<string>('INSERT_FRAGMENT');
  static OVERRIDE_FRAGMENT = actionCreator<OverrideFrag>('OVERRIDE_FRAGMENT');

  constructor(private ngRedux: NgRedux<FormBoxState>) { }

  loadTemplate(name: string): Action<string> {
    const action = TemplateActions.LOAD_TEMPLATE(name);

    return this.ngRedux.dispatch(action);
  }

  insertFragment(name: string): Action<string> {
    const action = TemplateActions.INSERT_FRAGMENT(name);

    return this.ngRedux.dispatch(action);
  }

  overrideFragment(fragId: string, newFragId: string): Action<OverrideFrag> {
    const action = TemplateActions.OVERRIDE_FRAGMENT({ fragId: fragId, newFragId: newFragId });

    return this.ngRedux.dispatch(action);
  }
}
