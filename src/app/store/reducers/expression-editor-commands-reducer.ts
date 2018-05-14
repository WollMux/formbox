import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers/';
import { tassign } from 'tassign';

import { DocumentCommand, ExpressionEditorCommandsState, INITIAL_STATE } from '../states/expression-editor-commands-state';
import { ExpressionEditorCommandsActions } from '../actions/expression-editor-commands-actions';

/**
 * Initialisiert den Store mit der Liste der Dokumentenkommandos.
 */
const init = (state: ExpressionEditorCommandsState, cmds: DocumentCommand[]): ExpressionEditorCommandsState => {
  return tassign(state, { documentCommands: cmds });
};

/**
 * Legt ein neues Dokumentenkommando an und hängt es an die Liste der Kommandos an.
 */
const newCommand = (state: ExpressionEditorCommandsState, id: number, cmd: string, order: number): ExpressionEditorCommandsState => {
  const c = { id: id, text: cmd, order: order };
  const cmds = state.documentCommands.slice();
  cmds.push(c);

  return tassign(state, {
    documentCommands: cmds
  });
};

/**
 * Löscht ein Dokumentenkommando.
 */
const deleteCommand = (state: ExpressionEditorCommandsState, id: number): ExpressionEditorCommandsState => {
  return tassign(state, {
    documentCommands: state.documentCommands.filter(cmd => cmd.id !== id)
  });
};

/**
 * Wählt das Kommando mit der Id id aus.
 */
const selectCommand = (state: ExpressionEditorCommandsState, id: number): ExpressionEditorCommandsState => {
  let index = state.documentCommands.findIndex(cmd => cmd.id === id);
  if (index < 0 && state.selected) {
    index = state.documentCommands.findIndex(cmd => cmd.id === state.selected.id);
  }
  let selected: DocumentCommand;
  if (index >= 0) {
    selected = state.documentCommands[index];
  }

  return tassign(state,
    {
      selected_index: index,
      selected: selected
    });
};

/**
 * Speichert Änderungen an einem Dokumentenkommando.
 */
const saveCommand = (state: ExpressionEditorCommandsState, index: number, cmd: DocumentCommand): ExpressionEditorCommandsState => {
  const ret = state.documentCommands.map((it, n) => {
    if (n !== index) {
      return it;
    }

    return { ...it, ...cmd };
  });

  return tassign(state, { documentCommands: ret });
};

export const expressionEditorCommandsReducer: Reducer<ExpressionEditorCommandsState> =
  reducerWithInitialState(INITIAL_STATE)
    .case(ExpressionEditorCommandsActions.INIT.done, (state, payload) => init(state, payload.result))
    .case(ExpressionEditorCommandsActions.CREATE.done, (state, payload) =>
      newCommand(state, payload.result, payload.params.cmd, payload.params.order))
    .case(ExpressionEditorCommandsActions.DELETE.done, (state, payload) => deleteCommand(state, payload.result))
    .case(ExpressionEditorCommandsActions.SELECT.done, (state, payload) => selectCommand(state, payload.result))
    .case(ExpressionEditorCommandsActions.SAVE.done, (state, payload) => saveCommand(state, payload.result, payload.params.cmd))
    .build();
