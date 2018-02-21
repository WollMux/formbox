import { DocumentCommand } from '../actions/template-actions';

export enum LoadingStatus {
  None,
  Loading,
  Finished
}

export enum DocumentCommandStatus {
  New,
  Executing,
  Done
}

/**
 * Status von Templates und Fragmenten.
 */
export interface TemplateState {
  name: string;
  status: LoadingStatus;
  fragments: string[];
  overrideFrags: { fragId: string, newFragId: string }[];
  documentCommands: { cmd: DocumentCommand, status: DocumentCommandStatus }[];
}

export const INITIAL_STATE: TemplateState = {
  name: undefined,
  status: LoadingStatus.None,
  fragments: [],
  overrideFrags: [],
  documentCommands: []
};
