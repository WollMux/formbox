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
