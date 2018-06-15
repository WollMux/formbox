import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Reducer } from 'redux';
import { tassign } from 'tassign';

import { AppState, INITIAL_STATE } from '../states/app-state';
import { SachleitendeverfuegungActions } from '../actions/sachleitendeverfuegung-actions';
import { AppActions } from '../actions/app-actions';

const busy = (state: AppState, value: boolean): AppState => {
  debugger;
  return tassign(state, { busy: value });
};

export const appStateReducer: Reducer<AppState> = reducerWithInitialState(INITIAL_STATE)
  .cases([SachleitendeverfuegungActions.PRINT], (state, payload) => busy(state, true))
  .case(AppActions.CONTINUE, (state, payload) => busy(state, false))
  .build();
