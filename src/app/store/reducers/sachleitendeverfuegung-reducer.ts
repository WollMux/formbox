import { Action, Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { tassign } from 'tassign';
import { Observable } from 'rxjs/Observable';

import { INITIAL_STATE, SachleitendeverfuegungState } from '../states/sachleitendeverfuegung-state';
import { SachleitendeverfuegungActions } from '../actions/sachleitendeverfuegung-actions';
import { SachleitendeVerfuegung } from '../../data/slv/sachleitende-verfuegung';

const insertVerfuegungspunkt = (
  state: SachleitendeverfuegungState,
  vp: { id: number, idNext?: number, text?: string, binding?: string, delete: boolean, abdruck?: boolean }
): SachleitendeverfuegungState => {
  const slv = new SachleitendeVerfuegung(state.slv.verfuegungspunkte);
  const v = slv.insertBeforeVerfuegunspunkt(vp.id, vp.idNext, vp.text, vp.binding);
  if (vp.abdruck && v.ordinal > 1) {
    v.abdruck = vp.abdruck;
  }
  const newState = tassign(state, { slv: slv });

  return newState;
};

const insertVerfuegungspunktDone =
  (state: SachleitendeverfuegungState, vp: { id: number, binding?: Observable<string> })
    : SachleitendeverfuegungState => {
    const slv = new SachleitendeVerfuegung(state.slv.verfuegungspunkte);
    const vp1 = slv.getVerfuegungspunkt(vp.id);
    vp1.controlText = (vp.binding) ? vp.binding : undefined;
    const newState = tassign(state, { slv: slv });

    return newState;
  };

const deleteVerfuegungspunkt =
  (state: SachleitendeverfuegungState, id: number): SachleitendeverfuegungState => {
    const slv = new SachleitendeVerfuegung(state.slv.verfuegungspunkte);
    slv.deleteVerfuegungspunkt(id);
    const newState = tassign(state, { slv: slv });

    return newState;
  };

const updateUeberschrift =
  (state: SachleitendeverfuegungState, id: number, ueberschrift: string): SachleitendeverfuegungState => {
    const slv = new SachleitendeVerfuegung(state.slv.verfuegungspunkte);
    const vp = slv.getVerfuegungspunkt(id);
    vp.ueberschrift = ueberschrift;
    const newState = tassign(state, { slv: slv });

    return newState;
  };

export const sachleitendeverfuegungReducer: Reducer<SachleitendeverfuegungState> = reducerWithInitialState(INITIAL_STATE)
  .case(SachleitendeverfuegungActions.INSERT_VERFUEGUNGSPUNKT.started, (state, payload) => insertVerfuegungspunkt(state, payload))
  .case(SachleitendeverfuegungActions.INSERT_VERFUEGUNGSPUNKT.done, (state, payload) => insertVerfuegungspunktDone(state, payload.result))
  .case(SachleitendeverfuegungActions.DELETE_VERFUEGUNGSPUNKT.done, (state, payload) => deleteVerfuegungspunkt(state, payload.result))
  .case(SachleitendeverfuegungActions.UPDATE_UEBERSCHRIFT, (state, payload) => updateUeberschrift(state, payload.id, payload.ueberschrift))
  .build();
