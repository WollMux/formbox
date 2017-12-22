import { TemplateState, TemplateStatus } from './template-state';

export interface FormBoxState {
  template: TemplateState;
  fragments: TemplateState[];
}

export const INITIAL_STATE: FormBoxState = {
  template: { status: TemplateStatus.None } as TemplateState,
  fragments: [] as TemplateState[]
};
