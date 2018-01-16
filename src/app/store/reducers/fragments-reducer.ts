import { Action, Reducer } from 'redux';
import { TemplateState } from '../states/template-state';

export const fragmentsReducer: Reducer<TemplateState[]> = (state: TemplateState[] = [], action: Action): TemplateState[] => {
  return state;
};
