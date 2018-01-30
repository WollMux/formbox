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
});
