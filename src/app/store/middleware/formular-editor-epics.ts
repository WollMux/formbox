import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { NgRedux } from '@angular-redux/store';
import { Logger } from '@nsalaun/ng-logger';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/forkJoin';
import { FormularEditorActions } from '../actions/formular-editor-actions';
import { FormDataService } from '../../services/form-data.service';
import { FormBoxState } from '../states/formbox-state';
import { FormularEditorService } from '../../services/formular-editor.service';

@Injectable()
export class FormularEditorEpics {
  constructor(
    private log: Logger,
    private formService: FormDataService,
    private formular: FormularEditorService
  ) { }

  /**
   * Lädt die Formularbeschreibung aus dem CustomXML.
   * Wenn kein CustomXML vorhanden ist, wird der Zustand auf undefined gesetzt,
   * und dem Anwender angeboten ein Formular zu erstellen.
   */
  loadingForm = (action: ActionsObservable<any>) => {
    return action.ofType(FormularEditorActions.LOAD_FORM.started)
      .mergeMap((value, n) => {
        return this.formService.read().then(form => {
          const act = FormularEditorActions.LOAD_FORM.done({ params: {}, result: form });

          return act;
        }).catch(err => {
          const act = FormularEditorActions.LOAD_FORM.done({ params: {}, result: undefined });

          return act;
        });
      });
  }

  /**
   * Immer wenn ein Formularelement geändert wird, soll das CustomXML gespeichert werden.
   */
  startSavingForm = (action: ActionsObservable<any>) => {
    return action.ofType(FormularEditorActions.ADD_CONTROL.done, FormularEditorActions.UPDATE_CONTROL,
      FormularEditorActions.MOVE_CONTROL, FormularEditorActions.REMOVE_CONTROL.done)
      .mergeMap((value, n) => {
        const act = FormularEditorActions.SAVE_FORM.started({});

        return Observable.of(act);
      });
  }

  /**
   * Überschreibt das CustomXML mit dem neuen Formular.
   */
  savingForm = (action: ActionsObservable<any>, store: NgRedux<FormBoxState>) => {
    return action.ofType(FormularEditorActions.SAVE_FORM.started)
      .mergeMap((value, n) => {
        return this.formService.write(store.getState().formularEditor.form).then(result => {
          const act = FormularEditorActions.SAVE_FORM.done({ params: {}, result: result });

          return act;
        }).catch(e => {
          const act = FormularEditorActions.SAVE_FORM.failed(e);

          return act;
        });
      });
  }

  /**
   * Legt ein neues Formular an.
   */
  creatingForm = (action: ActionsObservable<any>) => {
    return action.ofType(FormularEditorActions.CREATE_FORM.started)
      .mergeMap((value, n) => {
        const form = this.formular.createEmptyForm();
        const act = FormularEditorActions.CREATE_FORM.done({params: {}, result: form});

        return Observable.of(act);
      });
  }

  /**
   * Erzeugt ein neues Control und fügt es dem Formular hinzu.
   * Dabei wird eventuell ein ContentControl in Word erzeugt.
   */
  creatingControl = (action: ActionsObservable<any>) => {
    return action.ofType(FormularEditorActions.ADD_CONTROL.started)
      .mergeMap(({payload}, n) => {
        return this.formular.createFormControl(payload.type).then(control => {
          const act = FormularEditorActions.ADD_CONTROL.done({params: payload, result: control});

          return act;
        });
      });
  }

  /**
   * Löscht ein Control aus dem Formular.
   * Dabei wird eventuell das entsprechende ContentControl in Word gelöscht.
   */
  deletingControl = (action: ActionsObservable<any>) => {
    return action.ofType(FormularEditorActions.REMOVE_CONTROL.started)
      .mergeMap(({payload}, n) => {
        return this.formular.deleteControl(payload.ccid).then(() => {
          const act = FormularEditorActions.REMOVE_CONTROL.done({params: payload, result: {}});

          return act;
        });
      });
  }

  /**
   * Öffnet den Editor für ein Control.
   */
  editingControl = (action: ActionsObservable<any>) => {
    return action.ofType(FormularEditorActions.ADD_CONTROL.done, FormularEditorActions.CREATE_FORM.done)
      .mergeMap(({payload}, n) => {
        const act = FormularEditorActions.EDIT_CONTROL(payload.result.id);

        return Observable.of(act);
      });
  }

  /**
   * Schließt den Editor für ein Control.
   */
  hidingControl = (action: ActionsObservable<any>) => {
    return action.ofType(FormularEditorActions.UPDATE_CONTROL, FormularEditorActions.REMOVE_CONTROL.done)
      .mergeMap(({payload}, n) => {
        const id = payload.control ? payload.control.id : payload.params.id;
        const act = FormularEditorActions.HIDE_CONTROL(id);

        return Observable.of(act);
      });
  }
}
