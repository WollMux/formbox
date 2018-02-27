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
 * Legt ein neues Dokumentenkommando an und hängt es an die Liste der Kommandos
 * an. Das Kommando wird gleichzeitig selektiert.
 */
const newCommand = (state: ExpressionEditorCommandsState, id: number, cmd: string, order: number): ExpressionEditorCommandsState => {
  const c = { id: id, text: cmd, order: order };
  const cmds = state.documentCommands.slice();
  const n = cmds.push(c) - 1;

  return tassign(state, {
    selected_index: n,
    selected: c,
    documentCommands: cmds
  });
};

/**
 * Löscht ein Dokumentenkommando. Die Selektion wir auf undefined gesetzt. 
 */
const deleteCommand = (state: ExpressionEditorCommandsState, index: number): ExpressionEditorCommandsState => {
  return tassign(state, {
    selected_index: -1,
    selected: undefined,
    documentCommands: [
      ...state.documentCommands.slice(0, index),
      ...state.documentCommands.slice(index + 1)
    ]
  });
};

/**
 * Wählt das n-te Kommando aus der Liste der Dokumentenkommandos aus.
 */
const selectCommand = (state: ExpressionEditorCommandsState, index: number): ExpressionEditorCommandsState => {
  const selected = (index !== -1) ? state.documentCommands[index] : undefined;

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
    .case(ExpressionEditorCommandsActions.SELECT, (state, payload) => selectCommand(state, payload))
    .case(ExpressionEditorCommandsActions.SAVE.done, (state, payload) => saveCommand(state, payload.result, payload.params.cmd))
    .build();
