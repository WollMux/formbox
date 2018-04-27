import { Injectable } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';

import { OfficeService } from './office.service';

@Injectable()
export class SachleitendeVerfuegungService {
  private document = undefined;

  constructor(private log: Logger, private office: OfficeService) { /* Leer */ }

  async newDocument(): Promise<void> {
    this.log.debug('SachleitendeVerfuegungService.newDocument()');

    if (this.document) {
      return Promise.reject('Es ist bereits ein Dokument in Bearbeitung.');
    }

    return this.office.newDocument().then(doc => {
      this.document = doc;

      return Promise.resolve();
    });
  }

  async copyCurrentDocument(pageBreak = false): Promise<void> {
    this.log.debug('SachleitendeVerfuegungService.copyCurrentDocument()');

    return this.office.copyDocument(this.document).then(() => {
      if (pageBreak) {
        return this.office.insertPageBreak(this.document);
      }

      return Promise.resolve();
    });
  }

  async showDocument(): Promise<void> {
    this.log.debug('SachleitendeVerfuegungService.showDocument()');

    if (this.document) {
      return this.office.showDocument(this.document).then(() => this.document = undefined);
    }

    return Promise.reject('Kein Document offen.');
  }
}
