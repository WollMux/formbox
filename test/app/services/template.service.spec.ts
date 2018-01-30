import { inject, TestBed } from '@angular/core/testing';
import { TemplateService } from '../../../src/app/services/template.service';
import { HttpModule } from '@angular/http';
import { environment } from '../../../src/environments/environment';
import { OfficeService } from '../../../src/app/services/office.service';
import { NgLoggerModule } from '@nsalaun/ng-logger';

describe('TemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        NgLoggerModule.forRoot(environment.loglevel)
      ],
      providers: [
        TemplateService,
        { provide: OfficeService, useClass: environment.officeService }
      ]
    });
  });

  it('should be created', inject([TemplateService], (service: TemplateService) => {
    expect(service).toBeTruthy();
  }));
});
