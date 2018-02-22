import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { tassign } from 'tassign';
import { Success } from 'typescript-fsa';

import { AbsenderlisteState, INITIAL_STATE } from '../states/absender-state';
import { AbsenderlisteActions } from '../actions/absenderliste-actions';
import { Absender } from '../../storage/absender';

const changeAbsender = (state: AbsenderlisteState, absender: Absender): AbsenderlisteState => {
  if (!state.selected || (state.selected.id !== absender.id)) {
    return tassign(state, { selected: absender });
  }

  return state;
};

const loadAbsenderliste = (state: AbsenderlisteState, liste: Absender[]): AbsenderlisteState => {
  return tassign(state, { pal: liste });
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
  .case(AbsenderlisteActions.CHANGE_ABSENDER.done, (state, result) => changeAbsender(state, result.result))
  .case(AbsenderlisteActions.LOAD_ABSENDERLISTE.done, (state, result) => loadAbsenderliste(state, result.result))
  .case(AbsenderlisteActions.ADD_ABSENDER, (state, absender) => addAbsender(state, absender))
  .case(AbsenderlisteActions.REMOVE_ABSENDER, (state, id) => removeAbsender(state, id))
  .build();
