import { TemplateState, TemplateStatus } from './template-state';

/**
 * Globales Statusobjekt für FormBox.
 * Dient als Root für untergeordnete Statusobjekte. 
 */
export interface FormBoxState {
  template: TemplateState;
  fragments: TemplateState[];
}

/**
 * Initialer Status beim Start der Anwendung.
 * Hier können sinnvolle Defaultwerte im Status gesetzt werden.
 */
export const INITIAL_STATE: FormBoxState = {
  template: { status: TemplateStatus.None } as TemplateState,
  fragments: [] as TemplateState[]
};
