import { Action, Reducer } from 'redux';
import { TemplateState, TemplateStatus } from '../states/template-state';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { tassign } from 'tassign';
import { OverrideFrag, TemplateActions } from '../actions/template-actions';

/**
 * Setzt den Status in {@link TemplateState} auf TemplateStatus.Loading.
 * 
 * @param state Aktueller Status
 * @param name Name der Vorlage
 */
const loadTemplate = (state: TemplateState, name: string): TemplateState => {
  if (state.name !== name) {
    return tassign(state, { name: name, status: TemplateStatus.Loading });
  }

  return state;
};

const getTemplate = (state: TemplateState, contents: string): TemplateState => {
  if (state.contents !== contents) {
    return tassign(state, { contents: contents });
  }

  return state;
};

const loadTemplateFinished = (state: TemplateState): TemplateState => {
  if (state.status !== TemplateStatus.Finished) {
    return tassign(state, { status: TemplateStatus.Finished });
  }

  return state;
};

const overrideFragment = (state: TemplateState, payload: OverrideFrag): TemplateState => {
  const val = { fragId: payload.fragId, newFragId: payload.newFragId };
  const n = state.overrideFrags.findIndex(it => it.fragId === payload.fragId);
  let arr;
  if (n !== -1) {
    arr = [ ...state.overrideFrags.slice(0, n), val, ...state.overrideFrags.slice(n + 1) ];
  } else {
    arr = state.overrideFrags.slice();
    arr = arr.concat([ val ]);
  }

  return tassign(state, { overrideFrags: arr });
};

export const templateReducer: Reducer<TemplateState> = reducerWithInitialState({ status: TemplateStatus.None } as TemplateState)
  .case(TemplateActions.LOAD_TEMPLATE, (state, name) => loadTemplate(state, name))
  .case(TemplateActions.GET_TEMPLATE, (state, contents) => getTemplate(state, contents))
  .case(TemplateActions.OPEN_TEMPLATE, (state, payload) => state)
  .case(TemplateActions.LOAD_TEMPLATE_FINISHED, (state, payload) => loadTemplateFinished(state))
  .case(TemplateActions.OVERRIDE_FRAGMENT, (state, payload) => overrideFragment(state, payload))
  .build();
