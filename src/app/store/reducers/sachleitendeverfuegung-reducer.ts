import { Action, Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { tassign } from 'tassign';
import { Observable } from 'rxjs/Observable';

import { INITIAL_STATE, SachleitendeverfuegungState } from '../states/sachleitendeverfuegung-state';
import { SachleitendeverfuegungActions } from '../actions/sachleitendeverfuegung-actions';
import { SachleitendeVerfuegung } from '../../data/slv/sachleitende-verfuegung';
import { InitActions } from '../actions/init-actions';

const insertVerfuegungspunkt = (
  state: SachleitendeverfuegungState,
  vp: { id: number, idNext?: number, text?: string, binding?: string, delete: boolean, abdruck?: boolean }
): SachleitendeverfuegungState => {
  const slv = state.slv.clone();
  if (vp.id === state.slv.verfuegungspunkt1) {
    slv.insertFirst(vp.id, '', '');
  } else {
    const v = slv.insertBeforeVerfuegunspunkt(vp.id, vp.idNext, vp.text, vp.binding);
    if (vp.abdruck && v.ordinal > 1) {
      v.abdruck = vp.abdruck;
    }
  }

  const newState = tassign(state, { slv: slv });

  return newState;
};

const insertVerfuegungspunktDone =
  (state: SachleitendeverfuegungState, vp: { id: number, binding?: Observable<string> })
    : SachleitendeverfuegungState => {
    const slv = state.slv.clone();
    const vp1 = slv.getVerfuegungspunkt(vp.id);
    vp1.controlText = (vp.binding) ? vp.binding : undefined;
    const newState = tassign(state, { slv: slv });

    return newState;
  };

const deleteVerfuegungspunkt =
  (state: SachleitendeverfuegungState, id: number): SachleitendeverfuegungState => {
    const slv = state.slv.clone();
    slv.deleteVerfuegungspunkt(id);
    const newState = tassign(state, { slv: slv });

    return newState;
  };

const updateUeberschrift =
  (state: SachleitendeverfuegungState, id: number, ueberschrift: string): SachleitendeverfuegungState => {
    const slv = state.slv.clone();
    const vp = slv.getVerfuegungspunkt(id);
    vp.ueberschrift = ueberschrift;
    const newState = tassign(state, { slv: slv });

    return newState;
  };

const insertZuleitung = (state: SachleitendeverfuegungState, id: number, vpId: number): SachleitendeverfuegungState => {
  const slv = state.slv.clone();
  const vp = slv.getVerfuegungspunkt(vpId);
  vp.addZuleitungszeile(id);

  const newState = tassign(state, { slv: slv });

  return newState;
};

const insertVerfuegungspunkt1 = (state: SachleitendeverfuegungState, id: number): SachleitendeverfuegungState => {
  const slv = state.slv.clone();
  slv.verfuegungspunkt1 = id;

  const newState = tassign(state, { slv: slv });

  return newState;
};

const initSLV = (
  state: SachleitendeverfuegungState,
  vps: { id: number; text: string; binding: string; verfuegungspunkt1: boolean; }[]): SachleitendeverfuegungState => {
  const slv = new SachleitendeVerfuegung([]);
  vps.forEach(it => {
    if (it.verfuegungspunkt1) {
      slv.verfuegungspunkt1 = it.id;
      if (it.text) {
        slv.insertFirst(it.id, '', '');
      }
    } else {
      slv.addVerfuegungspunkt(it.id, it.text, it.binding);
    }
  });

  return tassign(state, { slv: slv });
};

export const sachleitendeverfuegungReducer: Reducer<SachleitendeverfuegungState> = reducerWithInitialState(INITIAL_STATE)
  .case(SachleitendeverfuegungActions.INSERT_VERFUEGUNGSPUNKT.started, (state, payload) => insertVerfuegungspunkt(state, payload))
  .case(SachleitendeverfuegungActions.INSERT_VERFUEGUNGSPUNKT.done, (state, payload) => insertVerfuegungspunktDone(state, payload.result))
  .case(SachleitendeverfuegungActions.DELETE_VERFUEGUNGSPUNKT.done, (state, payload) => deleteVerfuegungspunkt(state, payload.result))
  .case(SachleitendeverfuegungActions.UPDATE_UEBERSCHRIFT, (state, payload) => updateUeberschrift(state, payload.id, payload.ueberschrift))
  .case(SachleitendeverfuegungActions.INSERT_ZULEITUNG.done,
  (state, payload) => insertZuleitung(state, payload.result.id, payload.result.vpId))
  .case(SachleitendeverfuegungActions.INSERT_VERFUEGUNGSPUNKT1.done, (state, payload) => insertVerfuegungspunkt1(state, payload.result))
  .case(InitActions.INIT_SLV.done, (state, payload) => initSLV(state, payload.result))
  .build();
