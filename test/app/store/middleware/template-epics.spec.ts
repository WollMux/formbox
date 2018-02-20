import { TemplateActions } from '../../../../src/app/store/actions/template-actions';
import { async, inject, TestBed } from '@angular/core/testing';
import { TemplateEpics } from '../../../../src/app/store/middleware/template-epics';
import { ActionsObservable } from 'redux-observable';
import { NgLoggerModule } from '@nsalaun/ng-logger';
import { environment } from '../../../../src/environments/environment';
import { TemplateService } from '../../../../src/app/services/template.service';
import { HttpModule } from '@angular/http';
import { OfficeService } from '../../../../src/app/services/office.service';
import { NgReduxModule } from '@angular-redux/store';
import { TemplateMockService } from '../../services/mocks/template-mock.service';
import { ExpressionsService } from '../../../../src/app/services/expressions.service';

describe('Template epics', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgLoggerModule.forRoot(environment.loglevel),
        NgReduxModule
      ],
      providers: [
        { provide: TemplateService, useClass: TemplateMockService },
        TemplateActions,
        TemplateEpics,
        ExpressionsService
      ]
    });
  });

  it('start loading a template',
    async(inject([TemplateEpics, TemplateService],
      (templateEpics: TemplateEpics, templates: TemplateService) => {
        const url = 'http://localhost:4201/vorlagen/Externer_Briefkopf.docx';
        const spy = spyOn(templates, 'getTemplateUrl').and.returnValue(Promise.resolve(url));

        const action = TemplateActions.LOAD_TEMPLATE.started('Externer_Briefkopf');

        const p = templateEpics.loadingTemplate(ActionsObservable.of(action));

        p.subscribe(result => {
          expect(spy).toHaveBeenCalledWith('Externer_Briefkopf');
          expect(result).toEqual({ type: 'GET_TEMPLATE', payload: url });
        });
      })));

  it('load template from url',
    async(inject([TemplateEpics, TemplateService],
      (templateEpics: TemplateEpics, templates: TemplateService) => {
        const url = 'http://localhost:4201/vorlagen/Externer_Briefkopf.docx';
        const base64 = 'Base64';
        const spy = spyOn(templates, 'getFileAsBase64').and.returnValue(Promise.resolve(base64));

        const action = TemplateActions.GET_TEMPLATE(url);

        const p = templateEpics.gettingTemplateFromUrl(ActionsObservable.of(action));

        p.subscribe(result => {
          expect(spy).toHaveBeenCalledWith(url);
          expect(result).toEqual({ type: 'OPEN_TEMPLATE', payload: base64 });
        });
      }
    )));

  it('open template in Office',
    async(inject([TemplateEpics, TemplateService],
      (templateEpics: TemplateEpics, templates: TemplateService) => {
        const base64 = 'Base64';
        const spy = spyOn(templates, 'openDocument').and.returnValue(Promise.resolve());

        const action = TemplateActions.OPEN_TEMPLATE(base64);

        const p = templateEpics.openingTemplate(ActionsObservable.of(action));

        p.subscribe(result => {
          expect(spy).toHaveBeenCalledWith(base64);
          expect(result).toEqual({ type: 'GET_NEXT_COMMAND', payload: {} });
        });
      }
    )));

  it('getting next command',
    async(inject([TemplateEpics, TemplateService],
      (templateEpics: TemplateEpics, templates: TemplateService) => {
        const spy = spyOn(templates, 'getNextDocumentCommand').and.returnValue(Promise.resolve({ id: 10, cmd: 'insertFrag(\'Zusatz\')' }));

        const action = TemplateActions.GET_NEXT_COMMAND({});

        const p = templateEpics.gettingNextCommand(ActionsObservable.of(action));

        p.subscribe(result => {
          expect(spy).toHaveBeenCalledWith();
          expect(result).toEqual({ type: 'EXECUTE_COMMAND_STARTED', payload: { id: 10, cmd: 'insertFrag(\'Zusatz\')' } });
        });
      }
    )));

  it('inserting fragment',
    async(inject([TemplateEpics, TemplateService],
      (templateEpics: TemplateEpics, templates: TemplateService) => {
        const spy1 = spyOn(templates, 'getFragmentUrl').and.returnValue(Promise.resolve({ name: 'fragment', url: 'some url' }));
        const spy2 = spyOn(templates, 'insertFragment').and.returnValue(Promise.resolve());

        const action = TemplateActions.INSERT_FRAGMENT.started({ id: 10, name: 'fragment' });

        const p = templateEpics.insertingFragment(ActionsObservable.of(action));

        p.subscribe(result => {
          expect(spy1).toHaveBeenCalledWith('fragment');
          expect(spy2).toHaveBeenCalledWith(10, 'some url');
          expect(result).toEqual({ type: 'INSERT_FRAGMENT_DONE', payload: { params: { id: 10, name: 'fragment' }, result: 10 } });
        });
      }
    )));

  it('executing insertFrag',
    async(inject([TemplateEpics, ExpressionsService],
      (templateEpics: TemplateEpics, expr: ExpressionsService) => {
        const spy = spyOn(expr, 'eval').and.returnValue(Promise.resolve(undefined));

        const action = TemplateActions.EXECUTE_COMMAND.started({ id: 10, cmd: 'insertFrag(\'fragment\')' });

        const p = templateEpics.executingCommand(ActionsObservable.of(action));

        p.subscribe(result => {
          expect(spy).toHaveBeenCalledWith('insertFrag(\'fragment\')', 10);
          expect(result).toEqual({
            type: 'EXECUTE_COMMAND_DONE',
            payload: { params: { id: 10, cmd: 'insertFrag(\'fragment\')' }, result: 10 }
          });
        });
      }
    )));

  it('getting fragments',
    async(inject([TemplateEpics, TemplateService],
      (templateEpics: TemplateEpics, templates: TemplateService) => {
        const spy = spyOn(templates, 'getFragmentNames').and.returnValue(Promise.resolve(['Eins', 'Zwei', 'Drei']));

        const action = TemplateActions.GET_FRAGMENTS.started({});

        const p = templateEpics.gettingFragments(ActionsObservable.of(action));

        p.subscribe(result => {
          expect(spy).toHaveBeenCalled();
          expect(result).toEqual({ type: 'GET_FRAGMENTS_DONE', payload: { params: {}, result: ['Eins', 'Zwei', 'Drei'] } });
        });
      }
    )));

});
