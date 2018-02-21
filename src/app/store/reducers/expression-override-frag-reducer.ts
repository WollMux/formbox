import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { tassign } from 'tassign';

import { ExpressionOverrideFragState } from '../states/expression-override-frag-state';
import { ExpressionOverrideFragActions } from '../actions/expression-override-frag-actions';

/**
 * Hängt ein leeres overrideFrag an die Liste der overideFrags an. 
 */
const add = (state: ExpressionOverrideFragState): ExpressionOverrideFragState => {
  return tassign(state, {
    overrideFrags: [
      ...state.overrideFrags.slice(0),
      { oldFrag: '', newFrag: '' }
    ]
  });
};

/**
 * Löscht das n-te Element aus der Liste der overrideFrags.
 */
const remove = (state: ExpressionOverrideFragState, n: number): ExpressionOverrideFragState => {
  return tassign(state, {
    overrideFrags: [
      ...state.overrideFrags.slice(0, n),
      ...state.overrideFrags.slice(n + 1)
    ]
  });
};

/**
 * Speichert die Änderung der oldFrag eines existierenden overrideFrags.
 */
const updateOldFrag = (state: ExpressionOverrideFragState, n: number, oldFrag: string): ExpressionOverrideFragState => {
  return tassign(state, {
    overrideFrags: state.overrideFrags.map((it, index) => {
      if (index !== n) {
        return it;
      }

      if (it.oldFrag !== oldFrag) {
        return { oldFrag: oldFrag, newFrag: it.newFrag };
      } else {
        return it;
      }
    })
  });
};

/**
 * Speichert die Änderung der oldFrag eines existierenden overrideFrags.
 */
const updateNewFrag = (state: ExpressionOverrideFragState, n: number, newFrag: string): ExpressionOverrideFragState => {
  return tassign(state, {
    overrideFrags: state.overrideFrags.map((it, index) => {
      if (index !== n) {
        return it;
      }

      if (it.newFrag !== newFrag) {
        return { oldFrag: it.oldFrag, newFrag: newFrag };
      } else {
        return it;
      }
    })
  });
};

/**
 * Löscht die Liste der overrideFrags.
 */
const clear = (state: ExpressionOverrideFragState): ExpressionOverrideFragState => {
  return tassign(state, { overrideFrags: [] });
};

export const expressionOverrideFragReducer: Reducer<ExpressionOverrideFragState> =
  reducerWithInitialState({ overrideFrags: [] })
    .case(ExpressionOverrideFragActions.ADD, (state, payload) => add(state))
    .case(ExpressionOverrideFragActions.DELETE, (state, payload) => remove(state, payload))
    .case(ExpressionOverrideFragActions.UPDATE_OLDFRAG, (state, payload) => updateOldFrag(state, payload.n, payload.oldFrag))
    .case(ExpressionOverrideFragActions.UPDATE_NEWFRAG, (state, payload) => updateNewFrag(state, payload.n, payload.oldFrag))
    .case(ExpressionOverrideFragActions.CLEAR, (state, payload) => clear(state))
    .build();
