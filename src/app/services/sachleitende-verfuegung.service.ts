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

  /**
   * Erzeugt oder entfernt einen Verfügungspunkt an der aktuellen Cursorposition.
   */
  async toggleVerfuegungspunkt(): Promise<{ id: number, text?: string, delete: boolean }> {
    this.log.debug('SachleitendeVerfuegungService.toggleVerfuegungspunkt()');

    return this.office.isInsideContentControl().then(cc => {
      if (cc && cc.tag === 'SLV') {
        return this.removeVerfuegungspunkt(cc.id).then(id => ({ id: cc.id, delete: true }));
      } else {
        return this.insertVerfuegungspunkt().then(vp => ({ id: vp.id, text: vp.text, delete: false }));
      }
    });
  }

  /**
   * Gibt den Text der Überschrift eines Verfügungspunkts zurück.
   * 
   * @param id Id des Content Controls des Verfügungspunkts
   */
  async getVerfuegungspunktText(id: number): Promise<string> {
    return this.office.getContentControlText(id);
  }

  /**
   * Ändert die Überschrift eines Verfüngungspunkts.
   * 
   * @param id Id des Content Controls des Verfügungspunkts
   * @param text Text der überschrift ohne Römische Ziffer.
   * @param ordinal Römische Ziffer, die vor den Text gschrieben wird. Wenn
   *    keine Ziffer angegeben wird, wird nur der Text geschireben.
   */
  async updateVerfuegungspunktText(id: number, text: string, ordinal?: string): Promise<void> {
    let s;
    if (ordinal) {
      s = `${ordinal}\t${text}`;
    } else {
      s = text;
    }

    return this.office.replaceTextInContentControl(id, s);
  }

  async getVerfuegungspunkte(): Promise<number[]> {
    return this.office.getAllContentControls().then(c => {
      return Promise.resolve(c.filter(it => it.tag === 'SLV').map(it => it.id));
    });
  }

  async getNextVerfuegungspunkt(id?: number): Promise<number> {
    return this.office.getNextContentControls(id).then(c => {
      const vp = c.find(it => it.tag === 'SLV');
      if (vp) {
        return Promise.resolve(vp.id);
      } else {
        return Promise.resolve(undefined);
      }
    });
  }

  private async insertVerfuegungspunkt(): Promise<{ id: number, text: string }> {
    return this.office.expandRangeToParagraph().then(range => {
      return this.office.insertContentControl('', 'SLV', SachleitendeVerfuegungService.FORMATVORLAGE, range).then(id => {
        this.office.untrack(range);

        return this.office.getContentControlText(id).then(text => {
          return { id: id, text: text };
        });
      });
    });
  }

  private async removeVerfuegungspunkt(id: number): Promise<void> {
    return this.office.deleteContentControl(id);
  }
}
