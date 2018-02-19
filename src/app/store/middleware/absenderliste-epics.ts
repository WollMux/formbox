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
    return action.ofType(AbsenderlisteActions.CHANGE_ABSENDER.started)
      .mergeMap(({ payload }, n) => {
        const absender = store.getState().absenderliste.pal.find(it => it.id === payload);
        let act;
        if (absender) {
          act = AbsenderlisteActions.CHANGE_ABSENDER.done({ params: payload as number, result: absender });
        } else {
          act = AbsenderlisteActions.CHANGE_ABSENDER.failed({ params: payload as number, error: payload });
        }

        return Observable.of(act);
      });
  }

  savingAbsender = (action: ActionsObservable<any>, store: NgRedux<FormBoxState>) => {
    return action.ofType(AbsenderlisteActions.CHANGE_ABSENDER.done)
      .mergeMap(({payload}, n) => {
        const act = StorageActions.UPDATE_STORAGE_SELECTED.started({});

        return Observable.of(act);
      });
  }

  addingAbsenderByID = (action: ActionsObservable<any>, store: NgRedux<FormBoxState>) => {
    return action.ofType(AbsenderlisteActions.ADD_ABSENDER_BY_ID.started)
      .mergeMap(({payload}, n) => {
        const absender = store.getState().ldap.result[payload] as Absender;
        let act;
        if (absender) {
          act = AbsenderlisteActions.ADD_ABSENDER_BY_ID.done({ params: payload as number, result: absender });
        } else {
          act = AbsenderlisteActions.ADD_ABSENDER_BY_ID.failed({ params: payload as number, error: payload });
        }

        return Observable.of(act);
      });
  }

  addingAbsenderByIdDone = (action: ActionsObservable<any>, store: NgRedux<FormBoxState>) => {
    return action.ofType(AbsenderlisteActions.ADD_ABSENDER_BY_ID.done)
      .mergeMap(({payload}, n) => {
        const act = AbsenderlisteActions.ADD_ABSENDER(payload.result);

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
