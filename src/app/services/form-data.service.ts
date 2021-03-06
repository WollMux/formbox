import { Injectable } from '@angular/core';
import { OfficeService } from './office.service';
import { Form } from '../data/forms/form';
import { FormXmlParserService } from './form-xml-parser.service';
import { Logger } from '@nsalaun/ng-logger';

/**
 * Service zum Bearbeiten von Formulardefinitionen.
 */
@Injectable()
export class FormDataService {
  static readonly namespace = 'http://www.muenchen.de/formbox/forms';

  constructor(
    private office: OfficeService,
    private formXmlParser: FormXmlParserService,
    private log: Logger
  ) { }

  /**
   * Schreibt CustomXML in das aktuelle Dokument.
   */
  async write(form: Form): Promise<string> {
    return this.office.deleteXmlByNamespace(FormDataService.namespace).then(() => {
      const xml = this.convertToXml(form);

      return this.office.addXml(xml);
    });
  }

  /**
   * Liest CustomXML aus dem aktuellen Dokument.
   */
  async read(): Promise<Form> {
    return this.office.getXmlIdsByNamespace(FormDataService.namespace).then(ids => {
      if (ids.length > 0) {
        return this.office.getXmlById(ids.pop()).then(xml => {
          return this.parse(xml);
        });
      } else {
        return Promise.reject('No FormData found.');
      }
    });
  }

  /**
   * Löscht CustomXML aus dem aktuellen Dokument.
   */
  async clear(): Promise<void> {
    return this.office.deleteXmlByNamespace(FormDataService.namespace);
  }

  /**
   * Parst Formulardefinition in XML und gibt ein Form-Objekt zurück.
   */
  private parse(xml: string): Form {
    return this.formXmlParser.parse(xml);
  }

  /**
   * Konvertiert ein Form-Objekt nach XML.
   *
   */
  private convertToXml(form: Form): string {
    return this.formXmlParser.createXml(form);
  }
}
