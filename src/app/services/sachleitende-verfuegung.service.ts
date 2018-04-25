import { Injectable } from '@angular/core';
import { OfficeService } from './office.service';

@Injectable()
export class SachleitendeVerfuegungService {
  private document = undefined;

  constructor(private office: OfficeService) { /* Leer */ }

  async copyCurrentDocument(): Promise<void> {
    return await this.office.newDocument().then(async doc => {
      await this.office.copyDocument(doc).then(() => {
        this.document = doc;
      });
    });
  }

  async showDocument(): Promise<void> {
    if (document) {
      return this.office.showDocument(this.document).then(() => this.document = undefined);
    }

    return Promise.reject('Kein Document offen.');
  }
}
