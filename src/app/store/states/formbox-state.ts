import { LoadingStatus, TemplateState } from './template-state';
import { AbsenderlisteState } from './absender-state';
import { INITIAL_STATE as ldapInit, LDAPState } from './ldap-state';

/**
 * Globales Statusobjekt für FormBox.
 * Dient als Root für untergeordnete Statusobjekte. 
 */
export interface FormBoxState {
  absenderliste: AbsenderlisteState;
  template: TemplateState;
  ldap: LDAPState;
}

/**
 * Initialer Status beim Start der Anwendung.
 * Hier können sinnvolle Defaultwerte im Status gesetzt werden.
 */
export const INITIAL_STATE: FormBoxState = {
  absenderliste: { selected: undefined, pal: [] },
  template: { status: LoadingStatus.None, overrideFrags: [], documentCommands: [] } as TemplateState,
  ldap: ldapInit
};
