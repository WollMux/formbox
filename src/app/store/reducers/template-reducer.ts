import { Action, Reducer } from 'redux';
import { DocumentCommandStatus, LoadingStatus, TemplateState } from '../states/template-state';
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

const getFragments = (state: TemplateState, fragments: string[]): TemplateState => {
  return tassign(state, { fragments: fragments });
};

export const templateReducer: Reducer<TemplateState> = reducerWithInitialState({ status: LoadingStatus.None } as TemplateState)
  .case(TemplateActions.LOAD_TEMPLATE.started, (state, name) => loadTemplate(state, name))
  .case(TemplateActions.LOAD_TEMPLATE.done, (state, payload) => loadTemplateDone(state))
  .case(TemplateActions.GET_FRAGMENTS.done, (state, payload) => getFragments(state, payload.result))
  .build();
