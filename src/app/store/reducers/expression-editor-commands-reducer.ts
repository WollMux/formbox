import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers/';
import { tassign } from 'tassign';

import { DocumentCommand, ExpressionEditorCommandsState } from '../states/expression-editor-commands-state';
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
    documentCommands: cmds,
    showInsertFrag: false,
    showOverrideFrag: false
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
      selected: selected,
      showInsertFrag: false,
      showOverrideFrag: false
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

/**
 * Legt fest, ob die GUI für die Bearbeitung von insertFrags angezeigt werden
 * soll.
 */
const showInsertFrag = (state: ExpressionEditorCommandsState, show: boolean): ExpressionEditorCommandsState => {
  return tassign(state,
    {
      showInsertFrag: show,
      showOverrideFrag: (show) ? false : state.showOverrideFrag,
      selected_index: -1,
      selected: undefined
    });
};

/**
 * Legt fest, ob die GUI für die Bearbeitung von overrideFrags angezeigt werden
 * soll.
 */
const showOverrideFrag = (state: ExpressionEditorCommandsState, show: boolean): ExpressionEditorCommandsState => {
  return tassign(state,
    {
      showOverrideFrag: show,
      showInsertFrag: (show) ? false : state.showInsertFrag,
      selected_index: -1,
      selected: undefined
    });
};

export const expressionEditorCommandsReducer: Reducer<ExpressionEditorCommandsState> =
  reducerWithInitialState({
    documentCommands: [], selected_index: -1, selected: undefined,
    showInsertFrag: false, showOverrideFrag: false
  })
    .case(ExpressionEditorCommandsActions.INIT.done, (state, payload) => init(state, payload.result))
    .case(ExpressionEditorCommandsActions.NEW.done, (state, payload) =>
      newCommand(state, payload.result, payload.params.cmd, payload.params.order))
    .case(ExpressionEditorCommandsActions.DELETE.done, (state, payload) => deleteCommand(state, payload.result))
    .case(ExpressionEditorCommandsActions.SELECT, (state, payload) => selectCommand(state, payload))
    .case(ExpressionEditorCommandsActions.SAVE.done, (state, payload) => saveCommand(state, payload.result, payload.params.cmd))
    .case(ExpressionEditorCommandsActions.SHOW_INSERT_FRAG, (state, payload) => showInsertFrag(state, payload))
    .case(ExpressionEditorCommandsActions.SHOW_OVERRIDE_FRAG, (state, payload) => showOverrideFrag(state, payload))
    .build();
