import { TestBed, inject } from '@angular/core/testing';

import { AbsenderlisteService } from './absenderliste.service';

describe('AbsenderlisteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbsenderlisteService]
    });
  });

  it('should be created', inject([AbsenderlisteService], (service: AbsenderlisteService) => {
    expect(service).toBeTruthy();
  }));
});
