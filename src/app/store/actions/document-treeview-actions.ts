import { Injectable } from '@angular/core';
import actionCreatorFactory, { Action } from 'typescript-fsa';
import { NgRedux } from '@angular-redux/store';
import { DocumentTreeViewState } from '../states/document-treeview-state';

const actionCreator = actionCreatorFactory();

/**
 * Aktionen, die die Verarbeitung der Dokumenten-Treeview betreffen.
 */
@Injectable()
export class DocumentTreeViewActions {
  static GET_TREEVIEW_NODES = actionCreator.async<any, any[]>('GET_TREEVIEW_NODES');

  constructor(private ngRedux: NgRedux<DocumentTreeViewState>) { }

  getTemplateList(): Action<any> {
    const action = DocumentTreeViewActions.GET_TREEVIEW_NODES.started({});

    return this.ngRedux.dispatch(action);
  }
}