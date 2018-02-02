import { LoadingStatus, TemplateState } from './template-state';
import { AbsenderlisteState } from './absender-state';
<<<<<<< HEAD
import { INITIAL_STATE as ldapInit, LDAPState } from './ldap-state';
=======
import { ExpressionEditorState } from './expression-editor-state';
>>>>>>> Formulareditor 1.Teil.

/**
 * Globales Statusobjekt für FormBox.
 * Dient als Root für untergeordnete Statusobjekte. 
 */
export interface FormBoxState {
  absenderliste: AbsenderlisteState;
  template: TemplateState;
<<<<<<< HEAD
  ldap: LDAPState;
=======
  expressionEditor: ExpressionEditorState;
>>>>>>> Formulareditor 1.Teil.
}

/**
 * Initialer Status beim Start der Anwendung.
 * Hier können sinnvolle Defaultwerte im Status gesetzt werden.
 */
export const INITIAL_STATE: FormBoxState = {
  absenderliste: { selected: undefined, pal: [] },
  template: { status: LoadingStatus.None, overrideFrags: [], documentCommands: [] } as TemplateState,
<<<<<<< HEAD
  ldap: ldapInit
=======
  expressionEditor: { documentCommands: [], selected_index: -1, selected: undefined }
>>>>>>> Formulareditor 1.Teil.
};
