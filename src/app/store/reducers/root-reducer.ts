import { combineReducers, Reducer } from 'redux';

import { FormBoxState } from '../states/formbox-state';
import { templateReducer } from './template-reducer';
import { absenderlisteReducer } from './absenderliste-reducer';
import { ldapReducer } from './ldap-reducer';
import { expressionEditorReducer } from './expression-editor-reducer';
import { documentTreeViewReducer } from './document-treeview-reducer';
import { dialogReducer } from './dialog-reducer';
import { formularEditorReducer } from './formular-editor-reducer';
import { sachleitendeverfuegungReducer } from './sachleitendeverfuegung-reducer';

/**
 * Erzeugt aus mehreren Reducern einen Root-Reducer, der beim Start der
 * Anwendung an Redux übergeben wird.
 * Alle neuen Reducer müssen hier eingetragen werden.
 */
export const rootReducer: Reducer<FormBoxState> =
  combineReducers({
    absenderliste: absenderlisteReducer,
    template: templateReducer,
    ldap: ldapReducer,
    expressionEditor: expressionEditorReducer,
    documentTree: documentTreeViewReducer,
    dialog: dialogReducer,
    formularEditor: formularEditorReducer,
    slv: sachleitendeverfuegungReducer
  });
