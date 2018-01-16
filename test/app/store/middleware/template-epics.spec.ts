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

fdescribe('Template epics', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgLoggerModule.forRoot(environment.loglevel),
        NgReduxModule
      ],
      providers: [
        { provide: TemplateService, useClass: TemplateMockService },
        TemplateActions,
        TemplateEpics
      ]
    });
  });

  it('start loading a template',
    async(inject([TemplateEpics, TemplateService],
      (templateEpics: TemplateEpics, templates: TemplateService) => {
        const url = 'http://localhost:4201/vorlagen/Externer_Briefkopf.docx';
        const spy = spyOn(templates, 'getTemplateUrl').and.returnValue(Promise.resolve(url));

        const action = TemplateActions.LOAD_TEMPLATE('Externer_Briefkopf');

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
          expect(result).toEqual({ type: 'INSERT_FRAGMENTS', payload: {} });
        });
      }
    )));

  it('insert fragments',
    async(inject([TemplateEpics, TemplateService],
      (templateEpics: TemplateEpics, templates: TemplateService) => {
        const spy = spyOn(templates, 'insertFragment').and.returnValue(Promise.resolve());

        const action = TemplateActions.INSERT_FRAGMENTS({});

        const p = templateEpics.insertingFragments(ActionsObservable.of(action));

        p.subscribe(result => {
          expect(spy).toHaveBeenCalledTimes(3);
          expect(result).toEqual({ type: 'LOAD_TEMPLATE_FINISHED', payload: '' });
        });
      }
    )));
});
