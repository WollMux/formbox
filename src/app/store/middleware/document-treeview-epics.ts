import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { Logger } from '@nsalaun/ng-logger';
import { NgRedux } from '@angular-redux/store/lib/src';
import { DocumentTreeViewActions } from '../actions/document-treeview-actions';
import { TemplateService } from '../../services/template.service';

@Injectable()
export class DocumentTreeViewEpics {
  constructor(
    private log: Logger,
    private templateService: TemplateService
  ) { }

  /**
   * Liste verfügbarer Dokumente von der Formbox-API abholen.
   */
  getTemplateList = (action: ActionsObservable<any>) => {
    return action.ofType(DocumentTreeViewActions.GET_TREEVIEW_NODES.started)
      .mergeMap((value, n) => {
        return this.templateService.getTreeView().then(templateList => {
          const act = DocumentTreeViewActions.GET_TREEVIEW_NODES.done({ params: {}, result: templateList });

          return act;
        });
      });
  }
}
