export enum TemplateStatus {
  None,
  Loading,
  Finished
}

/**
 * Status von Templates und Fragmenten.
 */
export interface TemplateState {
  name: string;
  url: string;
  contents: string;
  status: TemplateStatus;
  overrideFrags: { fragId: string, newFragId: string }[];
}
