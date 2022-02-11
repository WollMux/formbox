import * as romanize from 'romanize';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

export class Verfuegungspunkt {
  id: number;
  ordinal: number;
  zuleitungszeilen: number[] = [];
  binding: string;
  abdruck = false;

  private _ueberschrift: string;
  private _controlText: Observable<string>;
  private _controlTextObserver: Subscription;

  constructor(id: number, ueberschrift: string, binding: string, abdruck?: boolean) {
    this.id = id;
    this.ueberschrift = ueberschrift;
    this.binding = binding;
    if (abdruck) {
      this.abdruck = abdruck;
    }
  }

  get ueberschrift(): string {
    return this._ueberschrift;
  }

  set ueberschrift(value: string) {
    if (value) {
      this._ueberschrift = value.replace(/\s+/g, ' '); // Ersetzt Whitespace durch ein einzelnes Leerzeichen.
    } else {
      this._ueberschrift = '';
    }
  }

  /**
   * Das Property wird zur Überwachung des Texts im Quelldokuments verwendet.
   * Ändert der Anwender des Text im Dokument, muss die Überschrift entsprechend
   * angepaßt werden.
   */
  get controlText(): Observable<string> {
    return this._controlText;
  }

  set controlText(value: Observable<string>) {
    this._controlText = value;
  }

  addZuleitungszeile(zuleitung: number): void {
    this.zuleitungszeilen.push(zuleitung);
  }

  getNumberOfCopies(): number {
    return (this.zuleitungszeilen.length > 0) ? this.zuleitungszeilen.length : 1;
  }

  getRomanNumeral(): string {
    return romanize(this.ordinal);
  }
}
