import { combineReducers, Reducer } from 'redux';
import { FormBoxState } from '../states/formbox-state';
import { templateReducer } from './template-reducer';
import { fragmentsReducer } from './fragments-reducer';

export const rootReducer: Reducer<FormBoxState> =
  combineReducers({
    template: templateReducer,
    fragments: fragmentsReducer
  });
