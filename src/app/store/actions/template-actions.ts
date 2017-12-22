import { Injectable } from '@angular/core';
import actionCreatorFactory from 'typescript-fsa';
import { NgRedux } from '@angular-redux/store';
import { FormBoxState } from '../states/formbox-state';

const actionCreator = actionCreatorFactory();

@Injectable()
export class TemplateActions {
  static LOAD_TEMPLATE = actionCreator<string>('LOAD_TEMPLATE');
  static GET_TEMPLATE = actionCreator<string>('GET_TEMPLATE');
  static OPEN_TEMPLATE = actionCreator<string>('OPEN_TEMPLATE');
  static LOAD_TEMPLATE_FINISHED = actionCreator<string>('LOAD_TEMPLATE_FINISHED');

  constructor(private ngRedux: NgRedux<FormBoxState>) { }

  loadTemplate(name: string): void {
    const action = TemplateActions.LOAD_TEMPLATE(name);
    this.ngRedux.dispatch(action);
  }
}
