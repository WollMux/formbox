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
import { DocumentCommand, TemplateActions } from '../actions/template-actions';
import { FormBoxState } from '../states/formbox-state';

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
          this.expr.ctx.overrideFrags = [];

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
          const act = TemplateActions.GET_NEXT_COMMAND({});

          return act;
        });
      }).catch(error => {
        this.log.error(error);
        const act = TemplateActions.ERROR(error);

        return Observable.of(act);
      });
  }

  /**
   * Gibt das nächste Dokumentenkommando zurück, das noch nicht verarbeitet
   * wurde.
   */
  gettingNextCommand = (action: ActionsObservable<any>) => {
    return action.ofType(TemplateActions.GET_NEXT_COMMAND)
      .mergeMap((value, n: number) => {
        return this.templates.getNextDocumentCommand().then(c => {
          if (c) {
            const act = TemplateActions.EXECUTE_COMMAND.started(c);

            return act;
          } else {
            const act = TemplateActions.LOAD_TEMPLATE.done({ params: value, result: {} });

            return act;
          }
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
        return this.templates.getFragmentUrl(payload.name).then(it => {
          return this.templates.insertFragment(payload.id, it.url).then(() => {
            const act = TemplateActions.INSERT_FRAGMENT.done({ params: payload, result: payload.id });

            return act;
          });
        });
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
          this.templates.insertValue(payload.id, val);
        }

        return Promise.resolve(TemplateActions.EXECUTE_COMMAND.done({ params: payload, result: payload.id }));
      });
  }

  /**
   * Wenn ein Dokumentenkommando verarbeitet wurde, wird TemplateActions.GET_NEXT_COMMAND
   * aufgerufen, um die Verarbeitung des nächsten Kommandos anzustossen.
   */
  executingCommandDone = (action: ActionsObservable<any>) => {
    return action.ofType(TemplateActions.EXECUTE_COMMAND.done)
      .mergeMap(({ payload }, n: number) => {
        const act = TemplateActions.GET_NEXT_COMMAND({});

        return Observable.of(act);
      });
  }

  /**
   * Liefert eine Liste der Namen aller Fragmente zurück.
   */
  gettingFragments = (action: ActionsObservable<any>) => {
    return action.ofType(TemplateActions.GET_FRAGMENTS.started)
      .mergeMap((value: any, n: number) => {
        return this.templates.getFragmentNames().then(fragments => {
          const act = TemplateActions.GET_FRAGMENTS.done({ params: {}, result: fragments });

          return act;
        });
      });
  }
}
