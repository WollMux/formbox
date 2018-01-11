import { Injectable } from '@angular/core';
import { TemplateService } from '../../services/template.service';
import { ActionsObservable, combineEpics } from 'redux-observable';
import { TemplateActions } from '../actions/template-actions';
import { Logger } from '@nsalaun/ng-logger';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/concat';


/**
 * Middleware für Templates und Fragmente.
 */
@Injectable()
export class TemplateEpics {
  constructor(
    private log: Logger,
    private templates: TemplateService,
    private actions: TemplateActions) { }

  /**
   * Startet das Laden eines Templates.
   * Action: LOAD_TEMPLATE
   * Payload: Name des Templates
   */
  loadingTemplate = (action: ActionsObservable<any>) => {
    return action.ofType(TemplateActions.LOAD_TEMPLATE)
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
        return this.templates.openDocument(payload).then(base64 => {
          const act = TemplateActions.INSERT_FRAGMENTS({});
          return act;
        }).catch(error => {
          this.log.error(error);
          const act = TemplateActions.ERROR(error);
          return act;
        });
      });
  }

  /**
   * Startet das Einfügen von Fragmenten.
   * Holt die Urls aller Fragmente und erzeugt für jede Url eine Action
   * {@link TemplateActions.INSERT_FRAGMENT}. 
   * 
   * Action: INSERT_FRAGMENTS
   * Payload: Keine
   */
  insertingFragments = (action: ActionsObservable<any>) => {
    return action.ofType(TemplateActions.INSERT_FRAGMENTS)
      .mergeMap((value, n: number) => {
        return Observable.fromPromise(this.templates.getFragmentUrls())
          .mergeMap((urls, index) => {
            return Observable.concat(
              Observable.from(urls.map(url => {
                const act = TemplateActions.INSERT_FRAGMENT(url);
                return act;
              })),
              Observable.of(TemplateActions.LOAD_TEMPLATE_FINISHED(''))
            );
          })
          .catch(error => {
            this.log.error(error);
            const act = TemplateActions.ERROR(error);
            return Observable.of(act);
          });
      });
  }

  /**
   * Fügt ein Fragment in das aktuelle Dokument ein.
   * 
   * Action: INSERT_FRAGMENT
   * Payload: Name und Url des Fragments.
   */
  insertingFragment = (action: ActionsObservable<any>) => {
    return action.ofType(TemplateActions.INSERT_FRAGMENT)
      .mergeMap(({ payload }, n: number) => {
        return this.templates.insertFragment(payload.name, payload.url).then(url => {
          const act = TemplateActions.INSERTED_FRAGMENT(payload);
          return act;
        }).catch(error => {
          this.log.error(error);
          const act = TemplateActions.ERROR(error);
          return act;
        });
      });
  }

  rootEpic = () => combineEpics(
    this.loadingTemplate,
    this.gettingTemplateFromUrl,
    this.openingTemplate,
    this.insertingFragments,
    this.insertingFragment
  )

}
