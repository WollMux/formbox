import { Action, Reducer } from 'redux';
import { LoadingStatus, TemplateState } from '../states/template-state';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { tassign } from 'tassign';
import { DocumentCommand, OverrideFrag, TemplateActions } from '../actions/template-actions';

/**
 * Setzt den Status in {@link TemplateState} auf TemplateStatus.Loading.
 * 
 * @param state Aktueller Status
 * @param name Name der Vorlage
 */
const loadTemplate = (state: TemplateState, name: string): TemplateState => {
  if (state.name !== name) {
    return tassign(state, { name: name, status: LoadingStatus.Loading });
  }

  return state;
};

const loadTemplateDone = (state: TemplateState): TemplateState => {
  if (state.status !== LoadingStatus.Finished) {
    return tassign(state, { status: LoadingStatus.Finished, documentCommands: [], overrideFrags: [] });
  }

  return state;
};

const overrideFragment = (state: TemplateState, payload: OverrideFrag): TemplateState => {
  const val = { fragId: payload.fragId, newFragId: payload.newFragId };
  const n = state.overrideFrags.findIndex(it => it.fragId === payload.fragId);
  let arr;
  if (n !== -1) {
    arr = [...state.overrideFrags.slice(0, n), val, ...state.overrideFrags.slice(n + 1)];
  } else {
    arr = state.overrideFrags.slice();
    arr = arr.concat([val]);
  }

  return tassign(state, { overrideFrags: arr });
};

const collectCommandsDone = (state: TemplateState, cmds: DocumentCommand[]): TemplateState => {
  const c = cmds.map(it => ({ cmd: it, done: false }));

  return tassign(state, { documentCommands: c });
};

const insertFragmentDone = (state: TemplateState, id: number): TemplateState => {
  const n = state.documentCommands.findIndex(it => it.cmd.id === id);
  if (n !== -1) {
    const cmd = state.documentCommands[n];
    const arr = [...state.documentCommands.slice(0, n), { cmd: cmd.cmd, done: true }, ...state.documentCommands.slice(n + 1)];

    return tassign(state, { documentCommands: arr });
  }

  return state;
};

export const templateReducer: Reducer<TemplateState> = reducerWithInitialState({ status: LoadingStatus.None } as TemplateState)
  .case(TemplateActions.LOAD_TEMPLATE.started, (state, name) => loadTemplate(state, name))
  .case(TemplateActions.LOAD_TEMPLATE.done, (state, payload) => loadTemplateDone(state))
  .case(TemplateActions.OPEN_TEMPLATE, (state, payload) => state)
  .case(TemplateActions.OVERRIDE_FRAGMENT, (state, payload) => overrideFragment(state, payload))
  .case(TemplateActions.COLLECT_COMMANDS.done, (state, payload) => collectCommandsDone(state, payload.result))
  .case(TemplateActions.INSERT_FRAGMENT.done, (state, payload) => insertFragmentDone(state, payload.result))
  .build();
