import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { tassign } from 'tassign';
import { Success } from 'typescript-fsa';

import { INITIAL_STATE, LDAPState } from '../states/ldap-state';
import { LDAPActions } from '../actions/ldap-actions';

const searchLDAP = (state: LDAPState, result: any[]): LDAPState => {
  return tassign(state, {result: result});
};

const clearLDAP = (state: LDAPState): LDAPState => {
  return tassign(state, {result: []});
};

export const ldapReducer: Reducer<LDAPState> = reducerWithInitialState(INITIAL_STATE)
  .case(LDAPActions.SEARCH_LDAP.done, (state, result) => searchLDAP(state, result.result))
  .case(LDAPActions.CLEAR_LDAP, (state, result) => clearLDAP(state))
  .build();
