import { TestBed, inject } from '@angular/core/testing';

import { Office.MockService } from './office.mock.service';

describe('Office.MockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Office.MockService]
    });
  });

  it('should be created', inject([Office.MockService], (service: Office.MockService) => {
    expect(service).toBeTruthy();
  }));
});
