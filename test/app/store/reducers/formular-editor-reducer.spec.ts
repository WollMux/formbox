import { formularEditorReducer as reducer } from '../../../../src/app/store/reducers/formular-editor-reducer';
import { FormularEditorState, INITIAL_STATE } from '../../../../src/app/store/states/formular-editor-state';
import { FormularEditorActions } from '../../../../src/app/store/actions/formular-editor-actions';
import { Form } from '../../../../src/app/data/forms/form';
import { Label } from '../../../../src/app/data/forms/label';
import { Hbox } from '../../../../src/app/data/forms/hbox';

describe('Formular Editor Reducer', () => {

  const label1 = new Label();
  label1.title = 'label 1';
  label1.id = 'l1';

  const label2 = new Label();
  label2.title = 'label 2';
  label2.id = 'l2';

  const label3 = new Label();
  label2.title = 'label 3';
  label3.id = 'l3';

  const hbox = new Hbox();
  hbox.controls = [label2];
  hbox.id = 'hbox';

  const form = new Form();
  form.title = 'myForm';
  form.id = 'myForm';
  form.controls = [label1, hbox];

  const myState: FormularEditorState = {isEdit: [], form: form};

  it('initial State', () => {
    expect(reducer(undefined, {type: 'UNKNOWN'})).toEqual(INITIAL_STATE);
  });

  it('save form', () => {
    const action = FormularEditorActions.LOAD_FORM.done({params: {}, result: form});
    expect(reducer(INITIAL_STATE, action)).toEqual({
      isEdit: [],
      form: form
    });
  });

  it('edit/hide control', () => {
    const action = FormularEditorActions.EDIT_CONTROL('id');
    let state = reducer(INITIAL_STATE, action);
    expect(state).toEqual({
      isEdit: ['id'],
      form: undefined
    });

    // Keine doppelte Id in isEdit
    state = reducer(state, action);
    expect(state).toEqual({
      isEdit: ['id'],
      form: undefined
    });

    const action2 = FormularEditorActions.HIDE_CONTROL('id');
    state = reducer(state, action2);
    expect(state).toEqual(INITIAL_STATE);
    // Doppelt aus isEdit entfernen geht nicht
    state = reducer(state, action2);
    expect(state).toEqual(INITIAL_STATE);
  });

  it('update form', () => {
    const form2 = new Form();
    form2.title = 'form 2';
    form2.id = form.id;
    const action = FormularEditorActions.UPDATE_CONTROL({control: form2});
    expect(reducer(myState, action)).toEqual({
      isEdit: [],
      form: form2
    });

    const newLabel1 = new Label();
    newLabel1.id = label1.id;
    newLabel1.title = 'new Label 1';
    const resultForm = new Form(form);
    resultForm.controls = [newLabel1, hbox];
    const action2 = FormularEditorActions.UPDATE_CONTROL({control: newLabel1});
    expect(reducer(myState, action2)).toEqual({
      isEdit: [],
      form: resultForm
    });
  });

  it('remove Control', () => {
    const resultForm = new Form(form);
    resultForm.controls = [hbox];
    const action = FormularEditorActions.REMOVE_CONTROL.done({params: {id: 'l1', ccid: undefined}, result: {}});
    expect(reducer(myState, action)).toEqual({
      isEdit: [],
      form: resultForm
    });
  });

  it('add Control', () => {
    const resultForm = new Form(form);
    resultForm.controls[2] = label3;
    const action = FormularEditorActions.ADD_CONTROL.done({params: {type: 'label', parentId: form.id, index: 2}, result: label3});
    expect(reducer(myState, action)).toEqual({
      isEdit: [],
      form: resultForm
    });
  });

  it('move Control', () => {
    const resultHbox = new Hbox(hbox);
    resultHbox.controls = [label1, label2];
    const resultForm = new Form(form);
    resultForm.controls = [resultHbox];
    const action = FormularEditorActions.MOVE_CONTROL({control: label1, newParentId: hbox.id, index: 0});
    expect(reducer(myState, action)).toEqual({
      isEdit: [],
      form: resultForm
    });
  });
});
