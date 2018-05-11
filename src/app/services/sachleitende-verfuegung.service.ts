import { Injectable } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';

import { OfficeService } from './office.service';

@Injectable()
export class SachleitendeVerfuegungService {
  private static readonly FORMATVORLAGE = 'FormboxVerfuegungspunkt';

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

  async toggleVerfuegungspunkt(): Promise<{ id: number, delete: boolean }> {
    this.log.debug('SachleitendeVerfuegungService.toggleVerfuegungspunkt()');

    return this.office.isInsideContentControl().then(cc => {
      if (cc && cc.tag === 'SLV') {
        return this.removeVerfuegungspunkt(cc.id).then(id => ({ id: cc.id, delete: true }));
      } else {
        return this.insertVerfuegungspunkt().then(id => ({ id: id, delete: false }));
      }
    });
  }

  async insertVerfuegungspunkt(): Promise<number> {
    return this.office.expandRangeToParagraph().then(range => {
      return this.office.insertContentControl('', 'SLV', SachleitendeVerfuegungService.FORMATVORLAGE, range).then(id => {
        this.office.untrack(range);

        return id;
      });
    });
  }

  async removeVerfuegungspunkt(id: number): Promise<void> {
    return this.office.deleteContentControl(id);
  }

  async getVerfuegungspunktText(id: number): Promise<string> {
    return this.office.getContentControlText(id);
  }

  async updateVerfuegungspunkt(id: number, text: string, ordinal?: string): Promise<void> {
    let s;
    if (ordinal) {
      s = `${ordinal}\t${text}`;
    } else {
      s = text;
    }

    return this.office.replaceTextInContentControl(id, s);
  }
}
