import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { tassign } from 'tassign';
import { Success } from 'typescript-fsa';
import { FormularEditorState, INITIAL_STATE } from '../states/formular-editor-state';
import { FormularGuiActions } from '../actions/formular-gui-actions';
import { Form } from '../../data/forms/form';

const updateBindings = (state: FormularEditorState, form: any[]): FormularEditorState => {
    return tassign(state);
};

const updateCCText = (state: FormularEditorState): FormularEditorState => {
    return tassign(state);
};

const updateValues = (state: FormularEditorState, form: Form): FormularEditorState => {
    return tassign(state, { form: form });
};

export const formularGuiReducer: Reducer<FormularEditorState> = reducerWithInitialState(INITIAL_STATE)
    .case(FormularGuiActions.INIT_BINDINGS.done, (state, result) => updateBindings(state, []))
    .case(FormularGuiActions.FILL_VALUES.done, (state, result) => updateValues(state, result.result))
    .case(FormularGuiActions.UPDATE_CC_TEXT, state => updateCCText(state))
    .build();
