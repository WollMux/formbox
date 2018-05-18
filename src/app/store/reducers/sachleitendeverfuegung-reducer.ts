import { Action, Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { tassign } from 'tassign';

import { INITIAL_STATE, SachleitendeverfuegungState } from '../states/sachleitendeverfuegung-state';
import { SachleitendeverfuegungActions } from '../actions/sachleitendeverfuegung-actions';
import { SachleitendeVerfuegung } from '../../data/slv/sachleitende-verfuegung';

const insertVerfuegungspunkt =
  (state: SachleitendeverfuegungState, vp: { id: number, idNext?: number, text?: string, delete: boolean })
    : SachleitendeverfuegungState => {
    state.slv.insertBeforeVerfuegunspunkt(vp.id, vp.idNext, vp.text);
    const newState = tassign(state, { slv: new SachleitendeVerfuegung(state.slv.verfuegungspunkte) });

    return newState;
  };

const deleteVerfuegungspunkt =
  (state: SachleitendeverfuegungState, id: number)
    : SachleitendeverfuegungState => {
    state.slv.deleteVerfuegungspunkt(id);
    const newState = tassign(state, { slv: new SachleitendeVerfuegung(state.slv.verfuegungspunkte) });

    return newState;
  };

export const sachleitendeverfuegungReducer: Reducer<SachleitendeverfuegungState> = reducerWithInitialState(INITIAL_STATE)
  .case(SachleitendeverfuegungActions.INSERT_VERFUEGUNGSPUNKT, (state, payload) => insertVerfuegungspunkt(state, payload))
  .case(SachleitendeverfuegungActions.DELETE_VERFUEGUNGSPUNKT, (state, payload) => deleteVerfuegungspunkt(state, payload.id))
  .build();
