import { ExpressionEditorCommandsState } from './expression-editor-commands-state';
import { ExpressionOverrideFragState } from './expression-override-frag-state';

export interface ExpressionEditorState {
  expressionEditorCommands: ExpressionEditorCommandsState;
  expressionEditorOverrideFrags: ExpressionOverrideFragState;
}
