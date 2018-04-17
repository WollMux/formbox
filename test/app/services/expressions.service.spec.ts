import { inject, TestBed } from '@angular/core/testing';

import { ExpressionsService } from '../../../src/app/services/expressions.service';
import { NgReduxModule } from '@angular-redux/store';
import { TemplateActions } from '../../../src/app/store/actions/template-actions';
import { TemplateService } from '../../../src/app/services/template.service';
import { NgLoggerModule } from '@nsalaun/ng-logger';
import { environment } from '../../../src/environments/environment';
import { HttpModule } from '@angular/http';
import { OfficeService } from '../../../src/app/services/office.service';

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
        TemplateService,
        ExpressionsService,
        OfficeService
      ]
    });
  });

  it('should be created', inject([ExpressionsService], (service: ExpressionsService) => {
    expect(service).toBeTruthy();
  }));

  it('evaluate insertFrag', inject([ExpressionsService], (service: ExpressionsService) => {
    const spy = spyOn(service.ctx, 'insertFrag').and.callThrough();
    const ret = service.eval('insertFrag(\'Externer_Briefkopf\')', 0);

    expect(ret).toBeUndefined();
    expect(spy).toHaveBeenCalledWith('Externer_Briefkopf');
  }));

  it('evaluate overrideFrag', inject([ExpressionsService], (service: ExpressionsService) => {
    const spy = spyOn(service.ctx, 'overrideFrag').and.callThrough();
    const ret = service.eval('overrideFrag({oldFrag: \'Adresse_Angaben\', newFrag: \'Empfaengerfeld\'})', 0);

    expect(spy).toHaveBeenCalledWith({ oldFrag: 'Adresse_Angaben', newFrag: 'Empfaengerfeld' });
  }));
});
