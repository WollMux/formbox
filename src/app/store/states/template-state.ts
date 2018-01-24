import { DocumentCommand } from '../actions/template-actions';

export enum LoadingStatus {
  None,
  Loading,
  Finished
}

/**
 * Status von Templates und Fragmenten.
 */
export interface TemplateState {
  name: string;
  status: LoadingStatus;
  overrideFrags: { fragId: string, newFragId: string }[];
  documentCommands: { cmd: DocumentCommand, done: boolean }[];
}
