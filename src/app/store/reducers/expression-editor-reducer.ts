import { combineReducers, Reducer } from 'redux';

import { ExpressionEditorState } from '../states/expression-editor-state';
import { expressionEditorCommandsReducer } from './expression-editor-commands-reducer';
import { expressionOverrideFragReducer } from './expression-override-frag-reducer';

export const expressionEditorReducer: Reducer<ExpressionEditorState> =
  combineReducers({
    expressionEditorCommands: expressionEditorCommandsReducer,
    expressionEditorOverrideFrags: expressionOverrideFragReducer
  });
