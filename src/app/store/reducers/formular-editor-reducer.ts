import { Action, Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { tassign } from 'tassign';
import { FormularEditorState, INITIAL_STATE } from '../states/formular-editor-state';
import { FormularEditorActions } from '../actions/formular-editor-actions';
import { Form } from '../../data/forms/form';
import { Control } from '../../data/forms/control';
import { Container } from '../../data/forms/container';

/**
 * Lädt ein neues Formular in den State.
 * @param state Der aktuelle State.
 * @param form Die neue Formularbeschreibung.
 */
const saveForm = (state: FormularEditorState, form: Form): FormularEditorState => {
  return tassign(state, {form: form});
};

/**
 * Öffnet den Editor für ein Control
 * @param state Der aktuelle State.
 * @param id Die Id des zu bearbeitenden Controls
 */
const editControl = (state: FormularEditorState, id: string): FormularEditorState => {
  if (state.isEdit.indexOf(id) < 0) {
    const isEdit = [
      ...state.isEdit,
      id
    ];

    return tassign(state, {isEdit: isEdit});
  }

  return state;
};

/**
 * Schließt den Editor für ein Control.
 * @param state Der aktuelle State.
 * @param id Die Id des zu verbergenden Controls.
 */
const hideControl = (state: FormularEditorState, id: string): FormularEditorState => {
  if (state.isEdit.indexOf(id) >= 0) {
    const isEdit = state.isEdit.filter(s => s !== id);

    return tassign(state, {isEdit: isEdit});
  }

  return state;
};

/**
 * Ersetzt das Control mit der gleichen Id wie control.
 * @param state Der aktuelle State.
 * @param control Das geänderte Control mit der gleichen Id wie sein Vorgänger.
 */
const updateControl = (state: FormularEditorState, control: any): FormularEditorState => {
  let form = new Form(state.form);
  const info = findParentControl(form, control.id);
  if (info.parent === undefined) {
    form = control;
  } else {
    info.parent.controls = replaceControlInArray(info.parent.controls, info.index, control);
  }

  return tassign(state, {form: form});
};

/**
 * Entfernt ein Control.
 * @param state Der aktuelle State.
 * @param id Die Id des zu entfernenden Controls.
 */
const removeControl = (state: FormularEditorState, id: string): FormularEditorState => {
  const form = new Form(state.form);
  const info = findParentControl(form, id);
  info.parent.controls = removeControlFromArray(info.parent.controls, info.index);

  return tassign(state, {form: form});
};

/**
 * Fügt ein neues Control hinzu.
 * @param state Der aktuelle State.
 * @param control Das neue Control.
 * @param parentId Die Id des neuen Parent Controls.
 * @param index Die Position an der das Control eingefügt wird.
 */
const addControl = (state: FormularEditorState, control: any, parentId, index: number): FormularEditorState => {
  const form = new Form(state.form);
  const parent = findControl(form, parentId);
  parent.controls = addControlToArray(parent.controls, index, control);

  return tassign(state, {form: form});
};

/**
 * Verschiebt ein Control.
 * @param state Der aktuelle State.
 * @param control Das zu verschiebende Control.
 * @param newParentId Die Id des neuen Parent Controls.
 * @param index Die Position an der das Control eingefügt wird.
 */
const moveControl = (state: FormularEditorState, control: any, newParentId: string, index: number): FormularEditorState => {
  const form = new Form(state.form);
  const info = findParentControl(form, control.id);
  info.parent.controls = removeControlFromArray(info.parent.controls, info.index);

  const newParent = findControl(form, newParentId);
  newParent.controls = addControlToArray(newParent.controls, index, control);

  return tassign(state, {form: form});
};

/**
 * Findet ausgehend von einer Basiskomponente ein Control.
 * @param base Die Basiskomponente.
 * @param id Die Id des Controls.
 */
const findControl = (base: any, id: string): any => {
  if (base.id === id) {
    return base;
  } else if (base.controls) {
    for (const control of base.controls) {
      const found = findControl(control, id);
      if (found) {
        return found;
      }
    }

    return undefined;
  } else {
    return undefined;
  }
};

/**
 * Findet ausgehend von einer Basiskomponente den Parent eines Controls.
 * @param base Die Basiskomponente.
 * @param id Die Id des Controls.
 */
const findParentControl = (base: any, id: string): {parent: any, index: number} => {
  if (base.id === id) {
    return {parent: undefined, index: -1};
  } else if (base.controls) {
    for (let i = 0; i < base.controls.length; i++) {
      const control = base.controls[i];
      if (control.id === id) {
        return {parent: base, index: i};
      } else {
        const found = findParentControl(control, id);
        if (found) {
          return found;
        }
      }
    }

    return undefined;
  } else {
    return undefined;
  }
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
  .case(FormularEditorActions.UPDATE_CONTROL, (state, payload) => updateControl(state, payload.control))
  .case(FormularEditorActions.REMOVE_CONTROL.done, (state, payload) => removeControl(state, payload.params.id))
  .case(FormularEditorActions.ADD_CONTROL.done, (state, payload) =>
    addControl(state, payload.result, payload.params.parentId, payload.params.index))
  .case(FormularEditorActions.MOVE_CONTROL, (state, payload) => moveControl(state, payload.control, payload.newParentId, payload.index))
  .case(FormularEditorActions.EDIT_CONTROL, (state, payload) => editControl(state, payload))
  .case(FormularEditorActions.HIDE_CONTROL, (state, payload) => hideControl(state, payload))
  .build();
