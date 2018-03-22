import { Form } from '../../data/forms/form';
import { FormDataService } from '../../services/form-data.service';

/**
 * Status von FormularEditor.
 */
export interface FormularEditorState {
  form: Form;
  isEdit: string[];
}

export const INITIAL_STATE: FormularEditorState = {
  form: undefined,
  isEdit: []
};
