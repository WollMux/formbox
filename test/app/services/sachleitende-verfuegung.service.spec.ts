import { async, inject, TestBed } from '@angular/core/testing';

import { NgReduxModule } from '@angular-redux/store';
import { NgLoggerModule } from '@nsalaun/ng-logger';
import { environment } from '../../../src/environments/environment';
import { HttpModule } from '@angular/http';
import { OfficeService } from '../../../src/app/services/office.service';
import { SachleitendeVerfuegungService } from '../../../src/app/services/sachleitende-verfuegung.service';
import { OfficeMockService } from '../../../src/app/services/mocks/office.mock.service';

describe('SachleitendeVerfuegungService', () => {
  let office: OfficeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        NgReduxModule,
        NgLoggerModule.forRoot(environment.loglevel)
      ],
      providers: [
        SachleitendeVerfuegungService,
        { provide: OfficeService, useClass: OfficeMockService }
      ]
    });
  });

  beforeEach(inject([OfficeService], (os: OfficeService) => {
    office = os;
  }));

  it('toggleVerfuegungspunkt - an', async(inject([SachleitendeVerfuegungService],
    (service: SachleitendeVerfuegungService) => {
      spyOn(office, 'isInsideContentControl').and.returnValue(Promise.resolve(undefined));
      const spy = spyOn(office, 'insertContentControl').and.returnValue(Promise.resolve(1));

      service.toggleVerfuegungspunkt().then(ret => {
        expect(spy).toHaveBeenCalled();
        expect(ret.id).toEqual(1);
        expect(ret.delete).toBeFalsy();
      });
    })));

  it('toggleVerfuegungspunkt - aus', async(inject([SachleitendeVerfuegungService],
    (service: SachleitendeVerfuegungService) => {
      spyOn(office, 'isInsideContentControl').and.returnValue(Promise.resolve({ id: 1, title: 'Test', tag: 'SLV' }));
      const spy = spyOn(office, 'deleteContentControl').and.returnValue(Promise.resolve());

      service.toggleVerfuegungspunkt().then(ret => {
        expect(spy).toHaveBeenCalled();
      });
    })));
});
