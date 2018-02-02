export interface DocumentCommand {
  id: number;
  text: string;
  order: number;
}

export interface ExpressionEditorState {
  documentCommands: DocumentCommand[];
  selected_index: number;
  selected: DocumentCommand;
}
