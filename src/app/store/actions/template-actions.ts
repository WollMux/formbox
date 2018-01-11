import { Injectable } from '@angular/core';
import actionCreatorFactory from 'typescript-fsa';
import { NgRedux } from '@angular-redux/store';
import { FormBoxState } from '../states/formbox-state';

const actionCreator = actionCreatorFactory();

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
  static INSERT_FRAGMENT = actionCreator<{ name: string, url: string }>('INSERT_FRAGMENT');
  static INSERTED_FRAGMENT = actionCreator<string>('INSERTED_FRAGMENT');

  constructor(private ngRedux: NgRedux<FormBoxState>) { }

  loadTemplate(name: string): void {
    const action = TemplateActions.LOAD_TEMPLATE(name);
    this.ngRedux.dispatch(action);
  }
}
