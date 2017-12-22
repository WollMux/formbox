import { Injectable } from '@angular/core';
import { TemplateService } from '../../services/template.service';
import { ActionsObservable, combineEpics } from 'redux-observable';
import { TemplateActions } from '../actions/template-actions';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TemplateEpics {
  constructor(private templates: TemplateService, private actions: TemplateActions) { }

  loadingTemplate = (action: ActionsObservable<any>) => {
    return action.ofType(TemplateActions.LOAD_TEMPLATE)
      .mergeMap(({ payload }, n: number) => {
        return this.templates.getTemplateUrl(payload).then(url => {
          // Action muss einer Variable zugewiesen werden, sonst wird sie nicht als Plain Object erkannt.
          const act = TemplateActions.GET_TEMPLATE(url);
          return act;
        }).catch(error => {
          console.log(error);
          return undefined;
        });
      });
  }

  gettingTemplateFromUrl = (action: ActionsObservable<any>) => {
    return action.ofType(TemplateActions.GET_TEMPLATE)
      .mergeMap(({ payload }, n: number) => {
        return this.templates.getFileAsBase64(payload).then(base64 => {
          const act = TemplateActions.OPEN_TEMPLATE(base64);
          return act;
        }).catch(error => {
          console.log(error);
          return undefined;
        });
      });
  }

  openingTemplate = (action: ActionsObservable<any>) => {
    return action.ofType(TemplateActions.OPEN_TEMPLATE)
      .mergeMap(({ payload }, n: number) => {
        return this.templates.openDocument(payload).then(base64 => {
          const act = TemplateActions.LOAD_TEMPLATE_FINISHED('FINISHED');
          return act;
        }).catch(error => {
          console.log(error);
          return undefined;
        });
      });
  }

  rootEpic = () => combineEpics(
    this.loadingTemplate,
    this.gettingTemplateFromUrl,
    this.openingTemplate
  )

}
