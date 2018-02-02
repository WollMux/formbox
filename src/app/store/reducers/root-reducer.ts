import { combineReducers, Reducer } from 'redux';
import { FormBoxState } from '../states/formbox-state';
import { templateReducer } from './template-reducer';
import { absenderlisteReducer } from './absenderliste-reducer';
<<<<<<< HEAD
import { ldapReducer } from './ldap-reducer';
=======
import { expressionEditorReducer } from './expression-editor-reducer';
>>>>>>> Formulareditor 1.Teil.

/**
 * Erzeugt aus mehreren Reducern einen Root-Reducer, der beim Start der 
 * Anwendung an Redux übergeben wird.
 * Alle neuen Reducer müssen hier eingetragen werden.
 */
export const rootReducer: Reducer<FormBoxState> =
  combineReducers({
    absenderliste: absenderlisteReducer,
    template: templateReducer,
<<<<<<< HEAD
    ldap: ldapReducer
=======
    expressionEditor: expressionEditorReducer
>>>>>>> Formulareditor 1.Teil.
  });
