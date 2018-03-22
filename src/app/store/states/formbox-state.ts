import { INITIAL_STATE as TS_INITIAL_STATE, LoadingStatus, TemplateState } from './template-state';
import { AbsenderlisteState } from './absender-state';
import { INITIAL_STATE as ldapInit, LDAPState } from './ldap-state';
import { ExpressionEditorState } from './expression-editor-state';
import { INITIAL_STATE as EEC_INITIAL_STATE } from './expression-editor-commands-state';
import { FormularEditorState, INITIAL_STATE as FE_INITIAL_STATE } from './formular-editor-state';

/**
 * Globales Statusobjekt für FormBox.
 * Dient als Root für untergeordnete Statusobjekte.
 */
export interface FormBoxState {
  absenderliste: AbsenderlisteState;
  template: TemplateState;
  ldap: LDAPState;
  expressionEditor: ExpressionEditorState;
  formularEditor: FormularEditorState;
}

/**
 * Initialer Status beim Start der Anwendung.
 * Hier können sinnvolle Defaultwerte im Status gesetzt werden.
 */
export const INITIAL_STATE: FormBoxState = {
  absenderliste: { selected: undefined, pal: [] },
  ldap: ldapInit,
  template: TS_INITIAL_STATE,
  expressionEditor: {
    expressionEditorCommands: EEC_INITIAL_STATE,
    expressionEditorOverrideFrags: { overrideFrags: [] }
  },
  formularEditor: FE_INITIAL_STATE
};
