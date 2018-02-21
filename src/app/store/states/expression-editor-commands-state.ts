export interface DocumentCommand {
  id: number;
  text: string;
  order: number;
}

export interface ExpressionEditorCommandsState {
  documentCommands: DocumentCommand[];
  selected_index: number;
  selected: DocumentCommand;
  showInsertFrag: boolean;
  showOverrideFrag: boolean;
}

export const INITIAL_STATE: ExpressionEditorCommandsState = {
  documentCommands: [],
  selected_index: -1,
  selected: undefined,
  showInsertFrag: false,
  showOverrideFrag: false
};
