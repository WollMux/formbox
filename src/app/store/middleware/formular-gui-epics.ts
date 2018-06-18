import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { NgRedux } from '@angular-redux/store';
import { Logger } from '@nsalaun/ng-logger';
import { Observable } from 'rxjs/Observable';
import { FormBoxState } from '../states/formbox-state';
import { FormularGuiService } from '../../services/formular-gui.service';
import { FormularGuiActions } from '../actions/formular-gui-actions';
import { Form } from '../../data/forms/form';

@Injectable()
export class FormularGuiEpics {
  constructor(
    private log: Logger,
    private formGuiService: FormularGuiService
  ) { }

  updateingFormGuiValues = (action: ActionsObservable<any>, store: NgRedux<FormBoxState>) => {
    return action.ofType(FormularGuiActions.FILL_VALUES.started)
      .mergeMap((payload, n) => {
        return this.formGuiService.updateFormGuiValues(store.getState().formularEditor.form).then(() => {
          const act = FormularGuiActions.FILL_VALUES.done({ params: {}, result: undefined });

          return act;
        }).catch(err => {
          const act = FormularGuiActions.FILL_VALUES.done({ params: {}, result: undefined });
        });
      });
  }

  updateingContentControlText = (action: ActionsObservable<any>, store: NgRedux<FormBoxState>) => {
    return action.ofType(FormularGuiActions.UPDATE_CONTENT_CONTROL_TEXT)
      .mergeMap(({ payload }, n) => {
        return this.formGuiService.updateCCText(payload.text, payload.ccid)
          .catch(err => {
            this.log.error(err);
          });
      }).ignoreElements();
  }
}
