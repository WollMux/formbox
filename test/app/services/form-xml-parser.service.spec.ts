import { TestBed, inject } from '@angular/core/testing';

import { FormXmlParserService } from './form-xml-parser.service';

describe('FormXmlParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormXmlParserService]
    });
  });

  it('should be created', inject([FormXmlParserService], (service: FormXmlParserService) => {
    expect(service).toBeTruthy();
  }));
});
