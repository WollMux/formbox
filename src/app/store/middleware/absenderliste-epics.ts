import { Injectable } from '@angular/core';
import { ActionsObservable, combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { Logger } from '@nsalaun/ng-logger';

import { AbsenderlisteService } from '../../services/absenderliste.service';
import { AbsenderlisteActions } from '../actions/absenderliste-actions';
import { StorageActions } from '../actions/storage-actions';
import { Absender } from '../../storage/absender';
import { NgRedux } from '@angular-redux/store/lib/src';
import { FormBoxState } from '../states/formbox-state';

@Injectable()
export class AbsenderlisteEpics {
  constructor(
    private log: Logger,
    private absenderliste: AbsenderlisteService
  ) { }

  loadingAbsenderliste = (action: ActionsObservable<any>) => {
    return action.ofType(AbsenderlisteActions.LOAD_ABSENDERLISTE.started)
      .mergeMap((value, n) => {
        return this.absenderliste.loadAbsenderliste().then(absender => {
          const act = AbsenderlisteActions.LOAD_ABSENDERLISTE.done({ params: {}, result: absender });

          return act;
        });
      });
  }

  changingAbsender = (action: ActionsObservable<any>, store: NgRedux<FormBoxState>) => {
    return action.ofType(AbsenderlisteActions.CHANGE_ABSENDER)
    .mergeMap(({payload}, n) => {
      const act = StorageActions.UPDATE_STORAGE_SELECTED.started(payload);

      return Observable.of(act);
    });
  }

  savingPAL = (action: ActionsObservable<any>, stroe: NgRedux<FormBoxState>) => {
    return action.ofType(AbsenderlisteActions.ADD_ABSENDER, AbsenderlisteActions.REMOVE_ABSENDER)
      .mergeMap(({payload}, n) => {
        const act = StorageActions.UPDATE_STORAGE_PAL.started({});

        return Observable.of(act);
      });
  }
}
