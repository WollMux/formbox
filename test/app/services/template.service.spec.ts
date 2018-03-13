import { inject, TestBed } from '@angular/core/testing';
import { TemplateService } from '../../../src/app/services/template.service';
import { HttpModule } from '@angular/http';
import { environment } from '../../../src/environments/environment';
import { OfficeService } from '../../../src/app/services/office.service';
import { NgLoggerModule } from '@nsalaun/ng-logger';
import { OfficeMockService } from '../../../src/app/services/mocks/office.mock.service';

describe('TemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        NgLoggerModule.forRoot(environment.loglevel)
      ],
      providers: [
        TemplateService,
        { provide: OfficeService, useClass: OfficeMockService }
      ]
    });
  });

  it('should be created', inject([TemplateService], (service: TemplateService) => {
    expect(service).toBeTruthy();
  }));
});
