import { Injectable } from '@angular/core';
import actionCreatorFactory, { Action } from 'typescript-fsa';
import { NgRedux } from '@angular-redux/store';
import { FormBoxState } from '../states/formbox-state';
import { LDAPFilter } from '../../services/ldap.service';

const actionCreator = actionCreatorFactory();

/**
 * Aktionen, die die Verarbeitung der Persönlichen Absenderliste betreffen.
 */
@Injectable()
export class LDAPActions {
  static SEARCH_LDAP = actionCreator.async<LDAPFilter, any[]>('SEARCH_LDAP');
  static CLEAR_LDAP = actionCreator<any>('CLEAR_LDAP');

  constructor(private ngRedux: NgRedux<FormBoxState>) { }

  searchingLDAP(filter: LDAPFilter): Action<LDAPFilter> {
    const action = LDAPActions.SEARCH_LDAP.started(filter);

    return this.ngRedux.dispatch(action);
  }

  clearingLDAP(): Action<any> {
    const action = LDAPActions.CLEAR_LDAP({});

    return this.ngRedux.dispatch(action);
  }
}
