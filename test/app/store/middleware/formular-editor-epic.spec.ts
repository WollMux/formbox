import { FormDataService } from '../../../../src/app/services/form-data.service';
import { async, inject, TestBed } from '@angular/core/testing';
import { environment } from '../../../../src/environments/environment';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { ActionsObservable } from 'redux-observable';
import { FormBoxState, INITIAL_STATE } from '../../../../src/app/store/states/formbox-state';
import configureStore from 'redux-mock-store'; // tslint:disable-line no-implicit-dependencies
import { NgLoggerModule } from '@nsalaun/ng-logger';
import { FormularEditorService } from '../../../../src/app/services/formular-editor.service';
import { OfficeService } from '../../../../src/app/services/office.service';
import { FormXmlParserService } from '../../../../src/app/services/form-xml-parser.service';
import { FormularEditorEpics } from '../../../../src/app/store/middleware/formular-editor-epics';
import { FormularEditorActions } from '../../../../src/app/store/actions/formular-editor-actions';
import { Form } from '../../../../src/app/data/forms/form';
import { Label } from '../../../../src/app/data/forms/label';

describe('Formular Editor epics', () => {
  let mockStore;

  const form = new Form();
  form.title = 'myForm';
  form.id = 'myForm';

  const label = new Label();
  label.id = 'label';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgLoggerModule.forRoot(environment.loglevel),
        NgReduxModule
      ],
      providers: [
        FormularEditorEpics,
        FormDataService,
        FormularEditorService,
        FormXmlParserService,
        OfficeService
      ]
    });
    mockStore = configureStore();
  });

  it('loading Form', async(inject([FormularEditorEpics, FormDataService],
    (epics: FormularEditorEpics, service: FormDataService) => {
    const spy = spyOn(service, 'read').and.returnValue(Promise.resolve(form));
    const action = FormularEditorActions.LOAD_FORM.started({});
    const p = epics.loadingForm(ActionsObservable.of(action));

    p.subscribe(result => {
      expect(result).toEqual({
        type: 'LOAD_FORM_DONE',
        payload: {
          params: {},
          result: form
        }
      });
    });
  })));

  it('start saving Form', async(inject([FormularEditorEpics], (epics: FormularEditorEpics) => {
    const addAction = FormularEditorActions.ADD_CONTROL.done({params: {type: '', path: [], key: 0}, result: undefined });
    const removeAction = FormularEditorActions.REMOVE_CONTROL.done({params: {id: '', path: [], key: 0, ccid: undefined}, result: {}});
    const moveAction = FormularEditorActions.MOVE_CONTROL({control: undefined, oldPath: [], oldKey: 0, newPath: [], newKey: 0});
    const updateAction = FormularEditorActions.UPDATE_CONTROL({control: undefined, path: [], key: 0});
    const p = epics.startSavingForm(ActionsObservable.of(addAction));
    const p2 = epics.startSavingForm(ActionsObservable.of(removeAction));
    const p3 = epics.startSavingForm(ActionsObservable.of(moveAction));
    const p4 = epics.startSavingForm(ActionsObservable.of(updateAction));

    const result = {
      type: 'SAVE_FORM_STARTED',
      payload: {}
    };

    p.subscribe(res => expect(res).toEqual(result));
    p2.subscribe(res => expect(res).toEqual(result));
    p3.subscribe(res => expect(res).toEqual(result));
    p4.subscribe(res => expect(res).toEqual(result));
  })));

  it('saving Form', async(inject([FormularEditorEpics, FormDataService, NgRedux],
    (epics: FormularEditorEpics, service: FormDataService, redux: NgRedux<FormBoxState>) => {
    const spy = spyOn(service, 'write').and.returnValue(Promise.resolve('myForm'));
    spyOn(redux, 'getState').and.returnValue({formularEditor: {form: new Form()}});
    const action = FormularEditorActions.SAVE_FORM.started({});
    const p = epics.savingForm(ActionsObservable.of(action), redux);

    p.subscribe(res => {
      expect(res).toEqual({
        type: 'SAVE_FORM_DONE',
        payload: {
          params: {},
          result: 'myForm'
        }
      });
    });
  })));

  it('creating Form', async(inject([FormularEditorEpics, FormularEditorService],
    (epics: FormularEditorEpics, service: FormularEditorService) => {
    const spy = spyOn(service, 'createEmptyForm').and.returnValue(form);
    const action = FormularEditorActions.CREATE_FORM.started({});
    const p = epics.creatingForm(ActionsObservable.of(action));

    p.subscribe(res => {
      expect(res).toEqual({
        type: 'CREATE_FORM_DONE',
        payload: {
          params: {},
          result: form
        }
      });
    });
  })));

  it('creating Control', async(inject([FormularEditorEpics, FormularEditorService],
    (epics: FormularEditorEpics, service: FormularEditorService) => {
      const spy = spyOn(service, 'createFormControl').and.returnValue(Promise.resolve(label));
      const action = FormularEditorActions.ADD_CONTROL.started({type: 'label', path: [], key: 0});
      const p = epics.creatingControl(ActionsObservable.of(action));

      p.subscribe(res => {
        expect(res).toEqual({
          type: 'ADD_CONTROL_DONE',
          payload: {
            params: {type: 'label', path: [], key: 0},
            result: label
          }
        });
      });
  })));

  it('deleting Control', async(inject([FormularEditorEpics], (epics: FormularEditorEpics) => {
      const action = FormularEditorActions.REMOVE_CONTROL.started({id: '', path: [], key: 0, ccid: 0});
      const p = epics.deletingControl(ActionsObservable.of(action));

      p.subscribe(res => {
        expect(res).toEqual({
          type: 'REMOVE_CONTROL_DONE',
          payload: {
            params: {id: '', path: [], key: 0, ccid: 0},
            result: {}
          }
        });
      });
  })));

  it('editing Control', async(inject([FormularEditorEpics], (epics: FormularEditorEpics) => {
      const addAction = FormularEditorActions.ADD_CONTROL.done({params: {type: '', path: [], key: 0}, result: label });
      const formAction = FormularEditorActions.CREATE_FORM.done({params: {}, result: form});
      const p = epics.editingControl(ActionsObservable.of(addAction));
      const p2 = epics.editingControl(ActionsObservable.of(formAction));

      p.subscribe(res => {
        expect(res).toEqual({
          type: 'EDIT_CONTROL',
          payload: label.id
        });
      });

      p2.subscribe(res => {
        expect(res).toEqual({
          type: 'EDIT_CONTROL',
          payload: form.id
        });
      });
  })));

  it('hiding Control', async(inject([FormularEditorEpics], (epics: FormularEditorEpics) => {
      const removeAction = FormularEditorActions.REMOVE_CONTROL.done({params: {id: 'myId', path: [], key: 0, ccid: undefined}, result: {}});
      const updateAction = FormularEditorActions.UPDATE_CONTROL({control: label, path: [], key: 0});
      const p = epics.hidingControl(ActionsObservable.of(removeAction));
      const p2 = epics.hidingControl(ActionsObservable.of(updateAction));

      p.subscribe(res => {
        expect(res).toEqual({
          type: 'HIDE_CONTROL',
          payload: 'myId'
        });
      });

      p2.subscribe(res => {
        expect(res).toEqual({
          type: 'HIDE_CONTROL',
          payload: label.id
        });
      });
  })));
});
