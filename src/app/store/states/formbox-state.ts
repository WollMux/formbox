import { LoadingStatus, TemplateState } from './template-state';
import { AbsenderlisteState } from './absender-state';
import { INITIAL_STATE as ldapInit, LDAPState } from './ldap-state';
import { ExpressionEditorState } from './expression-editor-state';

/**
 * Globales Statusobjekt für FormBox.
 * Dient als Root für untergeordnete Statusobjekte. 
 */
export interface FormBoxState {
  absenderliste: AbsenderlisteState;
  template: TemplateState;
  ldap: LDAPState;
  expressionEditor: ExpressionEditorState;
}

/**
 * Initialer Status beim Start der Anwendung.
 * Hier können sinnvolle Defaultwerte im Status gesetzt werden.
 */
export const INITIAL_STATE: FormBoxState = {
  absenderliste: { selected: undefined, pal: [] },
  ldap: ldapInit,
  template: { status: LoadingStatus.None, fragments: [], overrideFrags: [], documentCommands: [] } as TemplateState,
  expressionEditor: {
    expressionEditorCommands: {
      documentCommands: [],
      selected_index: -1,
      selected: undefined,
      showInsertFrag: false,
      showOverrideFrag: false
    },
    expressionEditorOverrideFrags: { overrideFrags: [] }
  }
};
