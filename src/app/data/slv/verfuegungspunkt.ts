export class Verfuegungspunkt {
  id: string;
  ordinal: number;
  zuleitungszeilen: string[] = [];

  private _ueberschrift: string;

  constructor(id: string, ordinal: number, ueberschrift: string) {
    this.id = id;
    this.ordinal = ordinal;
    this.ueberschrift = ueberschrift;
  }

  get ueberschrift(): string {
    return this._ueberschrift;
  }

  set ueberschrift(value: string) {
    this._ueberschrift = value.replace(/\s/g, ' '); // Ersetzt Whitespace durch ein einzelnes Leerzeichen.
  }

  addZuleitungszeile(zuleitung: string): void {
    this.zuleitungszeilen.push(zuleitung);
  }

  getNumberOfCopies(): number {
    return (this.zuleitungszeilen.length > 0) ? this.zuleitungszeilen.length : 1;
  }
}
