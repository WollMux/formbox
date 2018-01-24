import { LoadingStatus, TemplateState } from './template-state';
import { Absender } from '../../storage/pal';
import { AbsenderlisteState } from './absender-state';

/**
 * Globales Statusobjekt für FormBox.
 * Dient als Root für untergeordnete Statusobjekte. 
 */
export interface FormBoxState {
  absenderliste: AbsenderlisteState;
  template: TemplateState;
}

/**
 * Initialer Status beim Start der Anwendung.
 * Hier können sinnvolle Defaultwerte im Status gesetzt werden.
 */
export const INITIAL_STATE: FormBoxState = {
  absenderliste: { selected: undefined, pal: [] },
  template: { status: LoadingStatus.None, overrideFrags: [], documentCommands: [] } as TemplateState
};
