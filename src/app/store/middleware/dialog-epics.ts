import { Injectable } from '@angular/core';
import { ActionsObservable, combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { Logger } from '@nsalaun/ng-logger';
import { NgRedux } from '@angular-redux/store/lib/src';

import { FormBoxState } from '../states/formbox-state';
import { DialogService } from '../../services/dialog.service';
import { DialogActions } from '../actions/dialog-actions';

@Injectable()
export class DialogEpics {
  constructor(
    private log: Logger,
    private dialogService: DialogService
  ) { }

  displayDialog = (action: ActionsObservable<any>) => {
    return action.ofType(DialogActions.DISPLAY_DIALOG)
      .mergeMap(({payload}, n) => {
        return this.dialogService.showDialog(payload.url, payload.height, payload.width).then(result => {
            return;
        });
      });
  }
}
