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
    this.log.debug('SachleitendeVerfuegungService.getVerfuegungspunktText()');

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

  /**
   * Gibt die Überschrift eines Verfügunspunktes ohne die römische Ziffer zurück. 
   */
  splitVerfuegungspunkText(text: string): string {
    const s = text.split('\t');

    return s.pop();
  }

  /**
   * Liefert eine Liste der Ids aller Verfügungspunkte zurück.
   */
  async getVerfuegungspunkte(): Promise<number[]> {
    return this.office.getAllContentControls().then(c => {
      return Promise.resolve(c.filter(it => it.tag === 'SLV').map(it => it.id));
    });
  }

  /**
   * Gibt die ID des nächsten Verfügungspunktes zurück. Wenn keine ID übergeben wird,
   * wird von der aktuellen Cursorposition aus gesucht. 
   */
  async getNextVerfuegungspunkt(id?: number): Promise<number> {
    this.log.debug('SachleitendeVerfuegungService.getNextVerfuegungspunkt()');

    return this.office.getNextContentControls(id).then(c => {
      const vp = c.find(it => it.tag === 'SLV');
      if (vp) {
        return Promise.resolve(vp.id);
      } else {
        return Promise.resolve(undefined);
      }
    });
  }

  /**
   * Nummeriert die Verfügungspunkte neu durch und schriebt römische Ziffern
   * an den Beginn der Überschrift. 
   */
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

  /**
   * Löscht einen Verfügungspunkt aus dem Dokument und entfernt das Databinding. 
   */
  async removeVerfuegungspunkt(id: number, binding: string): Promise<void> {
    return this.office.deleteBinding(binding).then(() => {
      return this.office.deleteContentControl(id);
    });
  }

  /**
   * Vesteckt einen Verfügungspunkt einschließlich des Texts bis zum nächsten
   * Vertfügungspunkt. 
   */
  async hideVerfuegungspunkt(id: number): Promise<void> {
    return this.getNextVerfuegungspunkt(id).then(idNext => {
      return this.office.getRangeBetweenContentControls(id, idNext);
    }).then(rng => {
      return this.office.hideRange(rng).then(() => this.office.untrack(rng));
    });
  }

  /**
   * Macht einen versteckten Verfügungspunkt wieder sichtbar. 
   */
  async unhideVerfuegungspunkt(id: number): Promise<void> {
    return this.getNextVerfuegungspunkt(id).then(idNext => {
      return this.office.getRangeBetweenContentControls(id, idNext);
    }).then(rng => {
      return this.office.unhideRange(rng).then(() => this.office.untrack(rng));
    });
  }

  /**
   * Erzeugt das Databinding zwischen Verfügungspunkten und ContentControls.
   * Die Überschriften der Verfuegungspunkte werden automagisch upgedatet, wenn
   * der User den Text in den ContentControls anpasst. 
   */
  createObservableFromVerfuegungspunkt(vp: Verfuegungspunkt): Observable<string> {
    return Observable.create(ob => {
      const cb = (text: string) => {
        ob.next(text);
      };

      this.office.addEventHandlerToBinding(vp.binding, cb);

      return (() => this.office.removeEventHandlersFromBinding(vp.binding));
    });
  }

  /**
   * Erzeugt ein Databinding-Objekt für ein ContentControl. 
   */
  async bindVerfuegungspunkt(id: number): Promise<string> {
    this.log.debug('SachleitendeVerfuegungService.bindVerfuegungspunkt()');

    return this.office.bindToContentControl(id, 'SLV');
  }

  async print(slv: SachleitendeVerfuegung, copies: number[]): Promise<void> {
    this.newDocument().then(async doc => {
      let index = 0;
      for (const vp of slv.verfuegungspunkte) {
        if (copies[index] > 0) {
          const hidden = slv.verfuegungspunkte.filter(it => it.ordinal > vp.ordinal);
          await Promise.all(hidden.map(it => this.hideVerfuegungspunkt(it.id))).then(() => {
            return this.copyCurrentDocument(doc, true, (index === 0), copies[index]);
          }).then(() => {
            return Promise.all(hidden.map(it => this.unhideVerfuegungspunkt(it.id)));
          });
        }
        index++;
      }

      return Promise.resolve(doc);
    }).then(doc => {
      this.showDocument(doc);
    });
  }

  private async insertVerfuegungspunkt(): Promise<{ id: number, text: string, idNext: number, binding: string }> {
    this.log.debug('SachleitendeVerfuegungService.insertVerfuegungspunkt()');

    return this.office.insertContentControlAroundParagraph('', 'SLV', SachleitendeVerfuegungService.FORMATVORLAGE).then(id => {
      return this.bindVerfuegungspunkt(id).then(bid => ({ id: id, binding: bid }))
        .then(vp => this.office.getContentControlText(id).then(text => ({ id: id, binding: vp.binding, text: text })))
        .then(vp => this.getNextVerfuegungspunkt(id).then(idNext => ({ id: vp.id, text: vp.text, idNext: idNext, binding: vp.binding })));
    });
  }

  private async newDocument(): Promise<Word.DocumentCreated> {
    this.log.debug('SachleitendeVerfuegungService.newDocument()');

    return this.office.newDocument().then(doc => {
      return Promise.resolve(doc);
    });
  }

  private async copyCurrentDocument(target: Word.DocumentCreated, pageBreak = false, skipFirstBreak = false, times = 1): Promise<void> {
    this.log.debug('SachleitendeVerfuegungService.copyCurrentDocument()');

    return Promise.resolve().then(async () => {
      for (let i = 0; i < times; i++) {
        if (pageBreak && !(skipFirstBreak && i === 0)) {
          await this.office.insertPageBreak(target);
        }
        await this.office.copyDocument(target);
      }

      return Promise.resolve();
    });
  }

  private async showDocument(doc: Word.DocumentCreated): Promise<void> {
    this.log.debug('SachleitendeVerfuegungService.showDocument()');

    return this.office.showDocument(doc).then(() => this.office.untrack(doc));
  }

}
