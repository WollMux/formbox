import { Injectable } from '@angular/core';
import { ActionsObservable, combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { Logger } from '@nsalaun/ng-logger';
import { NgRedux } from '@angular-redux/store/lib/src';

import { FormBoxState } from '../states/formbox-state';
import { LDAPFilter, LDAPService } from '../../services/ldap.service';
import { LDAPActions } from '../actions/ldap-actions';

@Injectable()
export class LDAPEpics {
  constructor(
    private log: Logger,
    private ldap: LDAPService
  ) { }

  searchingLDAP = (action: ActionsObservable<any>) => {
    return action.ofType(LDAPActions.SEARCH_LDAP.started)
      .mergeMap(({payload}, n) => {
        return this.ldap.search(payload).then(result => {
          const act = LDAPActions.SEARCH_LDAP.done({params: payload as LDAPFilter, result: result});

          return act;
        });
      });
  }
}
