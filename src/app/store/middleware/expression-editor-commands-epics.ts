import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ActionsObservable } from 'redux-observable';
import { Logger } from '@nsalaun/ng-logger';

import { TemplateService } from '../../services/template.service';
import { ExpressionEditorCommandsActions } from '../actions/expression-editor-commands-actions';
import { FormBoxState } from '../states/formbox-state';
import { Observable } from 'rxjs/Observable';

/**
 * Epics für den ExpressionEditor.
 */
@Injectable()
export class ExpressionEditorCommandsEpics {
  constructor(
    private log: Logger,
    private templates: TemplateService
  ) { }

  /**
   * Lädt die Dokumentenkommandos aus der Briefvorlage.
   */
  initialising = (action: ActionsObservable<any>) => {
    return action.ofType(ExpressionEditorCommandsActions.INIT.started)
      .mergeMap(({ payload }, n: number) => {
        return this.templates.getDocumentCommands().then(cmds => {
          const ret = cmds.map(c => ({ id: c.id, text: c.cmd, order: +c.tag }));
          const act = ExpressionEditorCommandsActions.INIT.done({ params: {}, result: ret });

          return act;
        });
      });
  }

  /**
   * Erzeugt ein neues Dokumentenkommando im Dokument.
   */
  creatingDocumentCommand = (action: ActionsObservable<any>) => {
    return action.ofType(ExpressionEditorCommandsActions.CREATE.started)
      .mergeMap(({ payload }, n: number) => {
        return this.templates.createDocumentCommand(payload.cmd, payload.order).then(id => {
          const act = ExpressionEditorCommandsActions.CREATE.done({ params: payload, result: id });

          return act;
        }).catch(error => this.log.error(error));
      });
  }

  /**
   * Speichert Änderungen am Dokumentenkommando im Dokument.
   */
  savingDocumentCommand = (action: ActionsObservable<any>) => {
    return action.ofType(ExpressionEditorCommandsActions.SAVE.started)
      .mergeMap(({ payload }, n: number) => {
        return this.templates.updateDocumentCommand(payload.cmd.id, payload.cmd.text, payload.cmd.order).then(() => {
          const act = ExpressionEditorCommandsActions.SAVE.done({ params: payload, result: payload.index });

          return act;
        }).catch(error => this.log.error(error));
      });
  }

  /**
   * Löscht ein Dokumentenkommando aus dem Dokument.
   */
  deletingDocumentCommand = (action: ActionsObservable<any>, store: NgRedux<FormBoxState>) => {
    return action.ofType(ExpressionEditorCommandsActions.DELETE.started)
      .mergeMap(({ payload }, n: number) => {
        return this.templates.deleteDocumentCommand(payload).then(() => {
          const act = ExpressionEditorCommandsActions.DELETE.done({ params: payload, result: payload });

          return act;
        }).catch(error => this.log.error(error));
      });
  }

  startSelectingCommand = (action: ActionsObservable<any>, store: NgRedux<FormBoxState>) => {
    return action.ofType(ExpressionEditorCommandsActions.CREATE.done, ExpressionEditorCommandsActions.DELETE.done)
      .mergeMap(({ payload }, n: number) => {
        const act = ExpressionEditorCommandsActions.SELECT.started(payload.result);

        return Observable.of(act);
    });
  }

  /**
   * Setzt Index der Dokumentenkommandoliste und selektiert das entsprechende ContentControl.
   */
  selectCommand = (action: ActionsObservable<any>, store: NgRedux<FormBoxState>) => {
    return action.ofType(ExpressionEditorCommandsActions.SELECT.started)
      .mergeMap(({ payload }, n: number) => {
        const index = store.getState().expressionEditor.expressionEditorCommands.
          documentCommands.findIndex(cmd => cmd.id === payload);

        if (index >= 0) {
          return this.templates.selectContentControlById(payload).then(() => {
            const act = ExpressionEditorCommandsActions.SELECT.done({ params: payload, result: payload });

            return act;
          }).catch(error => this.log.error(error));
        } else {
          const act = ExpressionEditorCommandsActions.SELECT.done({ params: payload, result: payload });

          return Observable.of(act);
        }
      });
  }
}
