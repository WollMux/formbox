import { async, inject, TestBed } from '@angular/core/testing';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { ActionsObservable } from 'redux-observable';
import { NgLoggerModule } from '@nsalaun/ng-logger';
import { environment } from '../../../../src/environments/environment';
import { TemplateService } from '../../../../src/app/services/template.service';
import { TemplateMockService } from '../../services/mocks/template-mock.service';
import { TemplateActions } from '../../../../src/app/store/actions/template-actions';
import { ExpressionEditorCommandsActions } from '../../../../src/app/store/actions/expression-editor-commands-actions';
import { ExpressionEditorCommandsEpics } from '../../../../src/app/store/middleware/expression-editor-commands-epics';
import { FormBoxState } from '../../../../src/app/store/states/formbox-state';

describe('Expression Editor epics', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgLoggerModule.forRoot(environment.loglevel),
        NgReduxModule
      ],
      providers: [
        { provide: TemplateService, useClass: TemplateMockService },
        TemplateActions,
        ExpressionEditorCommandsActions,
        ExpressionEditorCommandsEpics
      ]
    });
  });

  it('initialising Expression Editor',
    async(inject([ExpressionEditorCommandsEpics, TemplateService],
      (epics: ExpressionEditorCommandsEpics, templates: TemplateService) => {
        const action = ExpressionEditorCommandsActions.INIT.started({});

        const p = epics.initialising(ActionsObservable.of(action));

        p.subscribe(result => {
          expect(result).toEqual({
            type: 'EXPRESSION_EDITOR_COMMANDS/INIT_DONE',
            payload: { params: {}, result: [{ id: 1, text: "insertFrag('fragment')", order: 1 }] }
          });
        });
      }
    )));

  it('creating DocumentCommand',
    async(inject([ExpressionEditorCommandsEpics, TemplateService],
      (epics: ExpressionEditorCommandsEpics, templates: TemplateService) => {
        const action = ExpressionEditorCommandsActions.CREATE.started({ cmd: 'cmd', order: 1 });

        const p = epics.creatingDocumentCommand(ActionsObservable.of(action));

        p.subscribe(result => {
          expect(result).toEqual({
            type: 'EXPRESSION_EDITOR_COMMANDS/CREATE_DONE',
            payload: { params: { cmd: 'cmd', order: 1 }, result: 1 }
          });
        });
      }
    )));

  it('saving DocumentCommand',
    async(inject([ExpressionEditorCommandsEpics, TemplateService],
      (epics: ExpressionEditorCommandsEpics, templates: TemplateService) => {
        const action = ExpressionEditorCommandsActions.SAVE.started({ index: 1, cmd: { id: 1, text: 'cmd', order: 1 } });

        const p = epics.savingDocumentCommand(ActionsObservable.of(action));

        p.subscribe(result => {
          expect(result).toEqual({
            type: 'EXPRESSION_EDITOR_COMMANDS/SAVE_DONE',
            payload: { params: { index: 1, cmd: { id: 1, text: 'cmd', order: 1 } }, result: 1 }
          });
        });
      }
    )));

  it('deleting DocumentCommand',
    async(inject([ExpressionEditorCommandsEpics, TemplateService, NgRedux],
      (epics: ExpressionEditorCommandsEpics, templates: TemplateService, redux: NgRedux<FormBoxState>) => {
        const action = ExpressionEditorCommandsActions.DELETE.started(0);

        spyOn(redux, 'getState').and.returnValue({
          expressionEditor: {
            expressionEditorCommands: {
              documentCommands: [{ id: 123 }]
            }
          }
        });

        const p = epics.deletingDocumentCommand(ActionsObservable.of(action), redux);

        p.subscribe(result => {
          expect(result).toEqual({
            type: 'EXPRESSION_EDITOR_COMMANDS/DELETE_DONE',
            payload: { params: 0, result: 0 }
          });
        });
      }
    )));
});
