import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers/';
import { tassign } from 'tassign';

import { DocumentCommand, ExpressionEditorState } from '../states/expression-editor-state';
import { ExpressionEditorActions } from '../actions/expression-editor-actions';

const init = (state: ExpressionEditorState, cmds: DocumentCommand[]): ExpressionEditorState => {
  return tassign(state, { documentCommands: cmds });
};

const newCommand = (state: ExpressionEditorState): ExpressionEditorState => {
  const cmd = { id: -1, text: 'Neues Kommando', order: Number.MAX_SAFE_INTEGER };
  const cmds = state.documentCommands.slice();
  const n = cmds.push(cmd) - 1;

  return tassign(state, { selected_index: n, selected: cmd, documentCommands: cmds });
};

const deleteCommand = (state: ExpressionEditorState, index: number): ExpressionEditorState => {
  return tassign(state, {
    selected_index: -1,
    selected: undefined,
    documentCommands: [
      ...state.documentCommands.slice(0, index),
      ...state.documentCommands.slice(index + 1)
    ]
  });
};

const selectCommand = (state: ExpressionEditorState, index: number): ExpressionEditorState => {
  const selected = (index !== -1) ? state.documentCommands[ index ] : undefined;

  return tassign(state, { selected_index: index, selected: selected });
};

const saveCommand = (state: ExpressionEditorState, index: number, cmd: DocumentCommand): ExpressionEditorState => {
  const ret = state.documentCommands.map((it, n) => {
    if (n !== index) {
      return it;
    }

    return { ...it, ...cmd };
  });

  return tassign(state, { documentCommands: ret });
};

export const expressionEditorReducer: Reducer<ExpressionEditorState> =
  reducerWithInitialState({ documentCommands: [], selected_index: -1, selected: undefined })
    .case(ExpressionEditorActions.INIT.done, (state, payload) => init(state, payload.result))
    .case(ExpressionEditorActions.NEW, (state, payload) => newCommand(state))
    .case(ExpressionEditorActions.DELETE, (state, payload) => deleteCommand(state, payload))
    .case(ExpressionEditorActions.SELECT, (state, payload) => selectCommand(state, payload))
    .case(ExpressionEditorActions.SAVE, (state, payload) => saveCommand(state, payload.index, payload.cmd))
    .build();
