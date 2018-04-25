import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { tassign } from 'tassign';
import { Success } from 'typescript-fsa';
import { DialogActions } from '../actions/dialog-actions';
import { FormBoxState, INITIAL_STATE } from '../states/formbox-state';

const displayDialog = (state: FormBoxState): FormBoxState => {
    return tassign(state, {});
};

export const dialogReducer: Reducer<FormBoxState> = reducerWithInitialState(INITIAL_STATE)
    .case(DialogActions.DISPLAY_DIALOG, (state, result) => displayDialog(state))
    .build();
