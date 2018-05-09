import { Action, Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { tassign } from 'tassign';

import { SachleitendeverfuegungState, INITIAL_STATE } from '../states/sachleitendeverfuegung-state';
import { SachleitendeverfuegungActions } from '../actions/sachleitendeverfuegung-actions';

// const action = (state: SachleitendeverfuegungState): SachleitendeverfuegungState => {
//   return state;
// };
 
export const sachleitendeverfuegungReducer: Reducer<SachleitendeverfuegungState> = reducerWithInitialState(INITIAL_STATE)
//   .case(SachleitendeverfuegungActions.ACTION, (state, payload) => action(state))
  .build();
