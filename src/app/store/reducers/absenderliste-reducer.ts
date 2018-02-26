import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { tassign } from 'tassign';
import { Success } from 'typescript-fsa';

import { AbsenderlisteState, INITIAL_STATE } from '../states/absender-state';
import { AbsenderlisteActions } from '../actions/absenderliste-actions';
import { Absender } from '../../storage/absender';

const changeAbsender = (state: AbsenderlisteState, id: number): AbsenderlisteState => {
  if (!state.selected || (state.selected.id !== id)) {
    return tassign(state, { selected: state.pal.find(it => it.id === id) });
  }

  return state;
};

const loadAbsenderState = (state: AbsenderlisteState, pal: Absender[], selected: number): AbsenderlisteState => {
  return tassign(state, { pal: pal, selected: pal.find(it => it.id === selected) });
};

const addAbsender = (state: AbsenderlisteState, absender: Absender): AbsenderlisteState => {
  const pal = state.pal.slice();
  pal.push(absender);

  return tassign(state, { pal: pal});
};

const removeAbsender = (state: AbsenderlisteState, id: number): AbsenderlisteState => {
  const pal = state.pal.slice();
  pal.splice(id, 1);

  return tassign(state, {pal: pal});
};

export const absenderlisteReducer: Reducer<AbsenderlisteState> = reducerWithInitialState(INITIAL_STATE)
  .case(AbsenderlisteActions.CHANGE_ABSENDER, (state, result) => changeAbsender(state, result))
  .case(AbsenderlisteActions.LOAD_ABSENDERSTATE.done, (state, result) =>
    loadAbsenderState(state, result.result.pal, result.result.selected))
  .case(AbsenderlisteActions.ADD_ABSENDER, (state, absender) => addAbsender(state, absender))
  .case(AbsenderlisteActions.REMOVE_ABSENDER, (state, id) => removeAbsender(state, id))
  .build();
