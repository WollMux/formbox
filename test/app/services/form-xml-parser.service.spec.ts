import { inject, TestBed } from '@angular/core/testing';
import { FormXmlParserService } from '../../../src/app/services/form-xml-parser.service';
import { NgLoggerModule } from '@nsalaun/ng-logger';
import { environment } from '../../../src/environments/environment';
import { Form } from '../../../src/app/data/forms/form';

describe('FormXmlParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgLoggerModule.forRoot(environment.loglevel)
      ],
      providers: [
        FormXmlParserService
      ]
    });
  });

  it('should be created', inject([ FormXmlParserService ], (service: FormXmlParserService) => {
    expect(service).toBeTruthy();
  }));

  it('parsing XML', inject([ FormXmlParserService ], (service: FormXmlParserService) => {
    const xml = '<form xmlns="http://www.muenchen.de/formbox/forms" ' +
      'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
      'xsi:schemaLocation="http://www.muenchen.de/formbox/forms http://www.muenchen.de/formbox/form.xsd">' +
      '<title>Form 1</title><controls></controls></form>';

    const f = service.parse(xml);

    expect(f).toBeDefined();
    expect(f instanceof Form).toBeTruthy();
    expect(f.title).toEqual('Form 1');
  }));

  it('writing XML', inject([ FormXmlParserService ], (service: FormXmlParserService) => {
    const f = new Form();
    f.title = 'Form 1';

    const xml = service.createXml(f);

    expect(xml).toEqual('<form xmlns="http://www.muenchen.de/formbox/forms" ' +
      'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
      'xsi:schemaLocation="http://www.muenchen.de/formbox/forms http://www.muenchen.de/formbox/form.xsd">' +
      '<title>Form 1</title><controls></controls></form>');
  }));
});
