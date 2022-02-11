import * as _ from 'underscore.string';
import * as romanize from 'romanize';

import { Verfuegungspunkt } from './verfuegungspunkt';

export class SachleitendeVerfuegung {
  verfuegungspunkt1: number;
  private _verfuegungspunkte: Verfuegungspunkt[] = [];

  /**
   * Gibt die Überschrift eines Verfügunspunktes ohne die römische Ziffer zurück. 
   */
  static splitVerfuegungspunktText = (text: string): string => {
    const arr = text.split('\t');

    return arr.pop();
  }

  static generatePrefix = (ordinal: number, abdruck: boolean): string => {
    let s = '';
    if (abdruck) {
      s = 'Abdruck von ';
      s += _.toSentence(Array.from<number>(Array(ordinal - 1).keys())
        .map(it => `${romanize(it + 1)}.`), ', ', ' und ');
    }

    return s;
  }

  constructor(vp?: Verfuegungspunkt[]) {
    if (vp) {
      this._verfuegungspunkte = vp.slice();
      this.renumber();
    }
  }

  clone(): SachleitendeVerfuegung {
    const slv = new SachleitendeVerfuegung(this._verfuegungspunkte);
    slv.verfuegungspunkt1 = this.verfuegungspunkt1;

    return slv;
  }

  get verfuegungspunkte(): Verfuegungspunkt[] {
    return this._verfuegungspunkte.sort((a, b) => a.ordinal - b.ordinal);
  }

  addVerfuegungspunkt(id: number, ueberschrift: string, binding: string): Verfuegungspunkt {
    return this.insertBeforeVerfuegunspunkt(id, undefined, ueberschrift, binding);
  }

  insertFirst(id: number, ueberschrift = '', binding = ''): Verfuegungspunkt {
    const vp = new Verfuegungspunkt(id, ueberschrift, binding);
    this._verfuegungspunkte.unshift(vp);

    return vp;
  }

  insertBeforeVerfuegunspunkt(id: number, idNext: number, ueberschrift: string, binding: string): Verfuegungspunkt {
    const vp = new Verfuegungspunkt(id, ueberschrift, binding);

    if (idNext) {
      const n = this._verfuegungspunkte.findIndex(v => v.id === idNext);
      if (n > 0) {
        this._verfuegungspunkte.splice(n, 0, vp);
      } else {
        this._verfuegungspunkte.unshift(vp);
      }
    } else {
      this._verfuegungspunkte.push(vp);
    }

    this.renumber();

    return vp;
  }

  deleteVerfuegungspunkt(id: number): void {
    const n = this._verfuegungspunkte.findIndex(v => v.id === id);
    if (n > -1) {
      this._verfuegungspunkte.splice(n, 1);
      this.renumber();
    }
  }

  getVerfuegungspunkt(id: number): Verfuegungspunkt {
    return this._verfuegungspunkte.find(vp => vp.id === id);
  }

  hasVerfuegungspunkt1(): boolean {
    return this.verfuegungspunkt1 !== undefined;
  }

  private renumber(): void {
    let ordinal = 1;
    this._verfuegungspunkte.forEach(v => {
      v.ordinal = ordinal++;
    });
  }
}
