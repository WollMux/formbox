import { Verfuegungspunkt } from './verfuegungspunkt';

export class SachleitendeVerfuegung {
  private _verfuegungspunkte: Verfuegungspunkt[] = [];

  get verfuegungspunkte(): Verfuegungspunkt[] {
    return this._verfuegungspunkte.sort((a, b) => a.ordinal - b.ordinal);
  }

  addVerfuegungspunkt(id: string, ordinal: number, ueberschrift: string): Verfuegungspunkt {
    const v = new Verfuegungspunkt(id, ordinal, ueberschrift);
    this._verfuegungspunkte.push(v);

    return v;
  }

  insertAfterVerfuegunspunkt(ordinal: number, id: string, ueberschrift: string): Verfuegungspunkt {
    this.renumberFrom(ordinal + 1);

    return this.addVerfuegungspunkt(id, ordinal + 1, ueberschrift);
  }

  deleteVerfuegungspunkt(ordinal: number): void {
    const n = this._verfuegungspunkte.findIndex(v => v.ordinal === ordinal);
    if (n > -1) {
      this._verfuegungspunkte.splice(n, 1);
      this.renumberFrom(ordinal + 1, false);
    }
  }

  getVerfuegungspunkt(ordinal: number): Verfuegungspunkt {
    return this._verfuegungspunkte.find(vp => vp.ordinal === ordinal);
  }

  getNextOrdinal(): number {
    const vp = this._verfuegungspunkte.reduce((p, v) => (p.ordinal > v.ordinal) ? p : v);

    return (vp) ? vp.ordinal + 1 : 1;
  }

  private renumberFrom(ordinal: number, increase = true): void {
    this._verfuegungspunkte.forEach(v => {
      if (v.ordinal >= ordinal) {
        v.ordinal += (increase) ? 1 : -1;
      }
    });
  }
}
