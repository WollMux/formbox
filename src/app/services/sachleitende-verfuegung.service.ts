import { Injectable } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';
import { Observable } from 'rxjs/Observable';
import * as romanize from 'romanize';

import { OfficeService } from './office.service';
import { SachleitendeVerfuegung } from '../data/slv/sachleitende-verfuegung';
import { Verfuegungspunkt } from '../data/slv/verfuegungspunkt';
import { SachleitendeverfuegungActions } from '../store/actions/sachleitendeverfuegung-actions';

@Injectable()
export class SachleitendeVerfuegungService {
  private static readonly FORMATVORLAGE = 'FormboxVerfuegungspunkt';

  private document = undefined;

  constructor(
    private log: Logger,
    private office: OfficeService
  ) { /* Leer */ }

  /**
   * Gibt eine Liste der ContentControls zurück, die als Verfügungspunkte
   * markiert sind. 
   */
  async getVerfuegungspunkteInDocument(): Promise<{ id: number, text: string }[]> {
    return this.office.getAllContentControls().then(cc => {
      return cc.filter(it => it.tag === 'SLV').map(it => ({ id: it.id, text: it.text }));
    });
  }

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
  async toggleVerfuegungspunkt(): Promise<{ id: number, idNext?: number, text: string, binding?: string, delete: boolean }> {
    this.log.debug('SachleitendeVerfuegungService.toggleVerfuegungspunkt()');

    return this.findCurrentVerfuegungspunkt().then(cc => {
      if (cc && cc.tag === 'SLV') {
        return Promise.resolve({ id: cc.id, text: cc.text, delete: true });
      } else {
        return this.insertVerfuegungspunkt().then(vp =>
          ({ id: vp.id, idNext: vp.idNext, text: vp.text, binding: vp.binding, delete: false }));
      }
    });
  }

  /**
   * Sucht nach einem ContentControl mit dem Tag 'SLV' im Absatz, in dem der
   * Cursor steht.
   */
  async findCurrentVerfuegungspunkt(): Promise<{ id: number, title: string, tag: string, text: string }> {
    this.log.debug('SachleitendeVerfuegungService.findCurrentVerfuegungspunkt()');

    return this.office.expandRangeToParagraph().then(range => {
      return Promise.resolve(range);
    }).then(range => {
      return this.office.getContentControlsInRange(range).then(cc => {
        this.office.untrack(range);

        return Promise.resolve(cc.find(it => it.tag === 'SLV'));
      });
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
      s = `${ordinal}.\t${text}`;
    } else {
      s = text;
    }

    return this.office.replaceTextInContentControl(id, s);
  }

  splitVerfuegungspunkText(text: string): string {
    const s = text.split('\t');

    return s.pop();
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

  async renumber(slv: SachleitendeVerfuegung): Promise<void> {
    const p = [];

    for (const vp of slv.verfuegungspunkte) {
      p.push(new Promise(() => {
        const numeral = romanize(vp.ordinal);
        this.updateVerfuegungspunktText(vp.id, vp.ueberschrift, numeral);
      }));
    }

    return Promise.all(p).then(() => Promise.resolve());
  }

  async removeVerfuegungspunkt(id: number, binding: string): Promise<void> {
    return this.office.deleteBinding(binding).then(() => {
      return this.office.deleteContentControl(id);
    });
  }

  createObservableFromVerfuegungspunkt(vp: Verfuegungspunkt): Observable<string> {
    return Observable.create(ob => {
      const cb = (text: string) => {
        ob.next(text);
      };

      this.office.addEventHandlerToBinding(vp.binding, cb);

      return (() => this.office.removeEventHandlersFromBinding(vp.binding));
    });
  }

  async bindVerfuegungspunkt(id: number): Promise<string> {
    return this.office.bindToContentControl(id, 'SLV');
  }

  private async insertVerfuegungspunkt(): Promise<{ id: number, text: string, idNext: number, binding: string }> {
    return this.office.insertContentControlAroundParagraph('', 'SLV', SachleitendeVerfuegungService.FORMATVORLAGE).then(id => {
      return this.bindVerfuegungspunkt(id).then(bid => ({ id: id, binding: bid }))
        .then(vp => this.office.getContentControlText(id).then(text => ({ id: id, binding: vp.binding, text: text })))
        .then(vp => this.getNextVerfuegungspunkt(id).then(idNext => ({ id: vp.id, text: vp.text, idNext: idNext, binding: vp.binding })));
    });
  }
}
