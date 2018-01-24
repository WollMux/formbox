import { Injectable } from '@angular/core';
import { TemplateService } from '../../services/template.service';
import { ActionsObservable, combineEpics } from 'redux-observable';
import { NgRedux } from '@angular-redux/store';
import { Logger } from '@nsalaun/ng-logger';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/forkJoin';

import { ExpressionsService } from '../../services/expressions.service';
import { DocumentCommand } from '../actions/template-actions';
import { TemplateActions } from '../actions/template-actions';
import { FormBoxState } from '../states/formbox-state';
import { LoadingStatus } from '../states/template-state';

/**
 * Middleware für Templates und Fragmente.
 */
@Injectable()
export class TemplateEpics {
  constructor(
    private log: Logger,
    private templates: TemplateService,
    private expr: ExpressionsService
  ) { }

  /**
   * Startet das Laden eines Templates.
   * Action: LOAD_TEMPLATE.started
   * Payload: Name des Templates
   */
  loadingTemplate = (action: ActionsObservable<any>) => {
    return action.ofType(TemplateActions.LOAD_TEMPLATE.started)
      .mergeMap(({ payload }, n: number) => {
        return this.templates.getTemplateUrl(payload).then(url => {
          // Action muss einer Variable zugewiesen werden, sonst wird sie nicht als Plain Object erkannt.
          const act = TemplateActions.GET_TEMPLATE(url);

          return act;
        }).catch(error => {
          this.log.error(error);
          const act = TemplateActions.ERROR(error);

          return act;
        });
      });
  }

  /**
   * Lädt ein Template als Base64 über eine Url.
   * Action: GET_TEMPLATE
   * Payload: Url des Templates
   */
  gettingTemplateFromUrl = (action: ActionsObservable<any>) => {
    return action.ofType(TemplateActions.GET_TEMPLATE)
      .mergeMap(({ payload }, n: number) => {
        return this.templates.getFileAsBase64(payload).then(base64 => {
          const act = TemplateActions.OPEN_TEMPLATE(base64);

          return act;
        }).catch(error => {
          this.log.error(error);
          const act = TemplateActions.ERROR(error);

          return act;
        });
      });
  }

  /**
   * Öffnet das Template in Office und startet das Laden der Fragmente.
   * Action: OPEN_TEMPLATE
   * Payload: Template als Base64
   */
  openingTemplate = (action: ActionsObservable<any>) => {
    return action.ofType(TemplateActions.OPEN_TEMPLATE)
      .mergeMap(({ payload }, n: number) => {
        return this.templates.openDocument(payload).then(() => {
          const act = TemplateActions.COLLECT_COMMANDS.started({});

          return act;
        });
      }).catch(error => {
        this.log.error(error);
        const act = TemplateActions.ERROR(error);

        return Observable.of(act);
      });
  }

  /**
   * Sammelt alle Dokumentenkommandos, die noch nicht ausgeführt worden sind.
   * Nachdem alle Kommandos ausgeführt wurden, wird LOAD_TEMPLATE.done aufgerufen.
   * 
   *  Action: COLLECT_COMMANDS.started
   *  Payload: Keine
   */
  collectingCommands = (action: ActionsObservable<any>, store: NgRedux<FormBoxState>) => {
    return action.ofType(TemplateActions.COLLECT_COMMANDS.started)
      .mergeMap((value, n: number) => {
        return this.templates.getDocumentCommands().then((cmds: DocumentCommand[]) => {
          const oldCmds = store.getState().template.documentCommands;
          let c = [];
          if (cmds) {
            c = cmds.filter(it => oldCmds.findIndex(oc => oc.cmd.id === it.id) === -1);
          }
          c = c.concat(oldCmds.filter(it => !it.done).map(it => it.cmd));

          let act;
          if (c.length > 0) {
            act = TemplateActions.COLLECT_COMMANDS.done({ params: {}, result: c });
          } else {
            act = TemplateActions.LOAD_TEMPLATE.done({ params: value, result: {} });
          }

          return act;
        });
      });
  }

  /**
   * Ruft für jedes Dokumentenkommando EXECUTE_COMMAND.started auf.
   * 
   * Action: COLLECT_COMMANDS.done
   * Payload: Liste von DokumentenKommandos
   */
  collectingCommandsDone = (action: ActionsObservable<any>) => {
    return action.ofType(TemplateActions.COLLECT_COMMANDS.done)
      .mergeMap(({ payload }, n: number) => {
        return Observable.from(payload.result as DocumentCommand[])
          .mergeMap(c => {
            const act = TemplateActions.EXECUTE_COMMAND.started(c);

            return Observable.of(act);
          });
      });
  }

  /**
   * Fügt ein Fragment in das aktive Dokument ein.
   * 
   * Action: INSERT_FRAGMENT.started
   * Payload: Id und Name des Fragments
   */
  insertingFragment = (action: ActionsObservable<any>) => {
    return action.ofType(TemplateActions.INSERT_FRAGMENT.started)
      .mergeMap(({ payload }, n: number) => {
        const act = TemplateActions.INSERT_FRAGMENT.done({ params: payload, result: payload.id });

        return Observable.of(act);
      });
  }

  /**
   * Nach dem Einfügen eines Fragments wird nach neuen Dokumentenkommandos
   * gesucht.
   * 
   * Action: INSERT_FRAGMENT.done
   * Payload: Id des Fragments
   */
  insertingFragmentDone = (action: ActionsObservable<any>) => {
    return action.ofType(TemplateActions.INSERT_FRAGMENT.done)
      .mergeMap(({ payload }, n: number) => {
        const act = TemplateActions.COLLECT_COMMANDS.started({});

        return Observable.of(act);
      });
  }

  /**
   * Führt ein DokumentenKommando aus.
   * 
   * Action: EXECUTE_COMMAND.started
   * Payload: Id des Kommandos und Expression.
   */
  executingCommand = (action: ActionsObservable<any>) => {
    return action.ofType(TemplateActions.EXECUTE_COMMAND.started)
      .mergeMap(({ payload }, n: number) => {
        const val = this.expr.eval(payload.cmd, payload.id);
        if (val) {
          // TODO: Fehler oder insertValue
        }

        return Promise.resolve(TemplateActions.EXECUTE_COMMAND.done({ params: payload, result: {} }));
      });
  }

}
