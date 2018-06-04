import { async, inject, TestBed } from '@angular/core/testing';

import { ExpressionsService } from '../../../src/app/services/expressions.service';
import { NgReduxModule } from '@angular-redux/store';
import { TemplateActions } from '../../../src/app/store/actions/template-actions';
import { TemplateService } from '../../../src/app/services/template.service';
import { NgLoggerModule } from '@nsalaun/ng-logger';
import { environment } from '../../../src/environments/environment';
import { HttpModule } from '@angular/http';
import { OfficeService } from '../../../src/app/services/office.service';
import { TemplateMockService } from './mocks/template-mock.service';

describe('ExpressionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        NgReduxModule,
        NgLoggerModule.forRoot(environment.loglevel)
      ],
      providers: [
        TemplateActions,
        { provide: TemplateService, useClass: TemplateMockService },
        ExpressionsService,
        OfficeService
      ]
    });
  });

  it('should be created', inject([ExpressionsService], (service: ExpressionsService) => {
    expect(service).toBeTruthy();
  }));

  it('evaluate insertFrag', async(inject([ExpressionsService], (service: ExpressionsService) => {
    const spy = spyOn(service.ctx, 'insertFrag').and.callThrough();
    const ret = service.eval('insertFrag(\'Externer_Briefkopf\')', 0);

    expect(typeof (ret.then)).toEqual('function');
    expect(spy).toHaveBeenCalledWith('Externer_Briefkopf');
  })));

  it('evaluate overrideFrag', async(inject([ExpressionsService], (service: ExpressionsService) => {
    const ret = service.eval('overrideFrag([{oldFrag: \'Adresse_Angaben\', newFrag: \'Empfaengerfeld\'}])', 0);

    ret.then(() => expect(service.ctx.overrideFrags).toEqual([{ oldFrag: 'Adresse_Angaben', newFrag: 'Empfaengerfeld' }]));
  })));

  it('evaluate insertFrag with empty override', async(inject([ExpressionsService], (service: ExpressionsService) => {
    const spy = spyOn<any>(service.ctx, 'getOverrideFrag').and.callThrough();
    service.eval('overrideFrag([{oldFrag: \'test\', newFrag: \'\'}])', 0).then(() => {
      const ret = service.eval('insertFrag(\'test\')', 1);

      ret.then(() => expect(spy.calls.first().returnValue).toEqual(''));
    });
  })));
});
