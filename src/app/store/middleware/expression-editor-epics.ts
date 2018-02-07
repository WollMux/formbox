import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ActionsObservable } from 'redux-observable';
import { Logger } from '@nsalaun/ng-logger';

import { TemplateService } from '../../services/template.service';
import { ExpressionEditorActions } from '../actions/expression-editor-actions';
import { FormBoxState } from '../states/formbox-state';

@Injectable()
export class ExpressionEditorEpics {
  constructor(
    private log: Logger,
    private templates: TemplateService
  ) { }

  initialising = (action: ActionsObservable<any>) => {
    return action.ofType(ExpressionEditorActions.INIT.started)
      .mergeMap(({ payload }, n: number) => {
        return this.templates.getDocumentCommands().then(cmds => {
          const ret = cmds.map(c => ({ id: c.id, text: c.cmd, order: +c.tag }));
          const act = ExpressionEditorActions.INIT.done({ params: {}, result: ret });

          return act;
        });
      });
  }

  creatingDocumentCommand = (action: ActionsObservable<any>) => {
    return action.ofType(ExpressionEditorActions.NEW.started)
      .mergeMap(({ payload }, n: number) => {
        return this.templates.createDocumentCommand(payload.cmd, payload.order).then(id => {
          const act = ExpressionEditorActions.NEW.done({ params: payload, result: id });

          return act;
        }).catch(error => this.log.error(error));
      });
  }

  savingDocumentCommand = (action: ActionsObservable<any>) => {
    return action.ofType(ExpressionEditorActions.SAVE.started)
      .mergeMap(({ payload }, n: number) => {
        return this.templates.updateDocumentCommand(payload.cmd.id, payload.cmd.text, payload.cmd.order).then(() => {
          const act = ExpressionEditorActions.SAVE.done({ params: payload, result: payload.index });

          return act;
        }).catch(error => this.log.error(error));
      });
  }

  deletingDocumentCommand = (action: ActionsObservable<any>, store: NgRedux<FormBoxState>) => {
    return action.ofType(ExpressionEditorActions.DELETE.started)
      .mergeMap(({ payload }, n: number) => {
        const id = store.getState().expressionEditor.documentCommands[payload].id;

        return this.templates.deleteDocumentCommand(id).then(() => {
          const act = ExpressionEditorActions.DELETE.done({ params: payload, result: payload });

          return act;
        }).catch(error => this.log.error(error));
      });
  }

}
