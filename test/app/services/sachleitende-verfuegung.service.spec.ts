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
      spyOn(office, 'getContentControlsInRange').and.returnValue(Promise.resolve([]));
      const spy = spyOn(office, 'insertContentControlAroundParagraph').and.returnValue(Promise.resolve(1));

      service.toggleVerfuegungspunkt().then(ret => {
        expect(spy).toHaveBeenCalled();
        expect(ret.id).toEqual(1);
        expect(ret.delete).toBeFalsy();
      });
    })));

  it('toggleVerfuegungspunkt - aus', async(inject([SachleitendeVerfuegungService],
    (service: SachleitendeVerfuegungService) => {
      spyOn(office, 'getContentControlsInRange').and.returnValue(Promise.resolve([{ id: 1, title: 'Test', tag: 'SLV', text: 'Test' }]));

      service.toggleVerfuegungspunkt().then(ret => {
        expect(ret.id).toEqual(1);
        expect(ret.delete).toBeTruthy();
      });
    })));

  it('insertZuleitungszeile', async(inject([SachleitendeVerfuegungService],
    (service: SachleitendeVerfuegungService) => {
      spyOn(office, 'getPreviousContentControl').and.returnValue(Promise.resolve(1));
      spyOn(office, 'insertContentControl').and.returnValue(Promise.resolve(2));

      service.insertZuleitungszeile().then(ret => {
        expect(ret.id).toEqual(2);
        expect(ret.vpId).toEqual(1);
      });
    })));
});
