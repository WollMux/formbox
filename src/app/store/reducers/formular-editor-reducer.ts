import { Action, Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { tassign } from 'tassign';
import { FormularEditorState, INITIAL_STATE } from '../states/formular-editor-state';
import { FormularEditorActions } from '../actions/formular-editor-actions';
import { Form } from '../../data/forms/form';
import { Control } from '../../data/forms/control';
import { Container } from '../../data/forms/container';

const saveForm = (state: FormularEditorState, form: Form): FormularEditorState => {
  return tassign(state, {form: form});
};

const editControl = (state: FormularEditorState, id: string): FormularEditorState => {
  let isEdit = state.isEdit;
  if (state.isEdit.indexOf(id) < 0) {
    isEdit = [
      ...state.isEdit,
      id
    ];
  }

  return tassign(state, {isEdit: isEdit});
};

const hideControl = (state: FormularEditorState, id: string): FormularEditorState => {
  let isEdit = state.isEdit;
  if (state.isEdit.indexOf(id) >= 0) {
    isEdit = isEdit.filter(s => s !== id);
  }

  return tassign(state, {isEdit: isEdit});
};

const updateForm = (state: FormularEditorState, control: any, path: string[], key: number): FormularEditorState => {
  let form = new Form(state.form);
  if (path.length === 0) {
    form = control;
  } else {
    const parent = findParentControl(form, path);
    parent.controls = replaceControlInArray(parent.controls, key, control);
  }

  return tassign(state, {form: form});
};

const removeControl = (state: FormularEditorState, path: string[], key: number): FormularEditorState => {
  const form = new Form(state.form);
  const parent = findParentControl(form, path);
  parent.controls = removeControlFromArray(parent.controls, key);

  return tassign(state, {form: form});
};

const addControl = (state: FormularEditorState, control: any, path: string[], key: number): FormularEditorState => {
  const form = new Form(state.form);
  const parent = findParentControl(form, path);
  parent.controls = addControlToArray(parent.controls, key, control);

  return tassign(state, {form: form});
};

const moveControl = (state: FormularEditorState, control: any, oldPath: string[], oldKey: number,
                     newPath: string[], newKey: number): FormularEditorState => {
  const form = new Form(state.form);
  const oldParent = findParentControl(form, oldPath);
  oldParent.controls = removeControlFromArray(oldParent.controls, oldKey);

  const newParent = findParentControl(form, newPath);
  newParent.controls = addControlToArray(newParent.controls, newKey, control);

  return tassign(state, {form: form});
};

/**
 * Findet ausgehend von einer Basiskomponente den Parent eines Controls.
 * @param base Die Basiskomponente
 * @param path Beschreibt den Weg von der Basiskomponente zum Parent.
 */
const findParentControl = (base: any, path: string[]): any => {
  // Der erste Eintrag im Array entspricht der Basiskomponente. Deswegen kann er verworfen werden.
  path.shift();
  for (const obj of path) {
    base = base.controls.find(c => c.id === obj);
  }

  return base;
};

/**
 * Fügt ein neues Element mit Index index den controls hinzu. Spätere Controls werden um eine Position nach hinten verschoben.
 * @param controls Ein Array mit Control Elementen.
 * @param index Der Index für das neue Element.
 * @param control Das neue Element.
 */
const addControlToArray = (controls: Control[], index: number, control: Control): Control[] => {
  return [
    ...controls.slice(0, index),
    control,
    ...controls.slice(index)
  ];
};

/**
 * Löscht das Element mit dem Index index aus controls
 * @param controls Ein Array mit Control-Elementen.
 * @param index Der Index des zu löschenden Elementes im Array.
 */
const removeControlFromArray = (controls: Control[], index: number): Control[] => {
  return [
    ...controls.slice(0, index),
    ...controls.slice(index + 1)
  ];
};

/**
 * Ersetzt in controls das Element mit dem Index index durch control.
 * @param controls Ein Array mit Control-Elementen.
 * @param index Der Index des zu ersetzenden Elementes im Array.
 * @param control Das neue Control.
 */
const replaceControlInArray = (controls: Control[], index: number, control: Control): Control[] => {
  return controls.map((item, i) => {
    if (index !== i) {
      return item;
    }

    return control;
  });
};

export const formularEditorReducer: Reducer<FormularEditorState> = reducerWithInitialState(INITIAL_STATE)
  .cases([FormularEditorActions.LOAD_FORM.done, FormularEditorActions.CREATE_FORM.done], (state, payload) =>
    saveForm(state, payload.result))
  .case(FormularEditorActions.UPDATE_CONTROL, (state, payload) => updateForm(state, payload.control, payload.path, payload.key))
  .case(FormularEditorActions.REMOVE_CONTROL.done, (state, payload) => removeControl(state, payload.params.path, payload.params.key))
  .case(FormularEditorActions.ADD_CONTROL.done, (state, payload) =>
    addControl(state, payload.result, payload.params.path, payload.params.key))
  .case(FormularEditorActions.MOVE_CONTROL, (state, payload) =>
    moveControl(state, payload.control, payload.oldPath, payload.oldKey, payload.newPath, payload.newKey))
  .case(FormularEditorActions.EDIT_CONTROL, (state, payload) => editControl(state, payload))
  .case(FormularEditorActions.HIDE_CONTROL, (state, payload) => hideControl(state, payload))
  .build();
