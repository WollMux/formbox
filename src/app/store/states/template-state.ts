export enum TemplateStatus {
  None,
  Loading,
  Finished
}

export interface TemplateState {
  name: string;
  url: string;
  contents: string;
  status: TemplateStatus;
}
