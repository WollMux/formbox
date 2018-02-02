import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Logger } from '@nsalaun/ng-logger';

import { TemplateService } from '../../services/template.service';
import { ExpressionEditorActions } from '../actions/expression-editor-actions';

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
}
