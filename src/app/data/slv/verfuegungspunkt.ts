import * as romanize from 'romanize';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

export class Verfuegungspunkt {
  id: number;
  ordinal: number;
  zuleitungszeilen: string[] = [];
  binding: string;

  private _ueberschrift: string;
  private _controlText: Observable<string>;
  private _controlTextObserver: Subscription;

  constructor(id: number, ueberschrift: string, binding: string) {
    this.id = id;
    this.ueberschrift = ueberschrift;
    this.binding = binding;
  }

  get ueberschrift(): string {
    return this._ueberschrift;
  }

  set ueberschrift(value: string) {
    this._ueberschrift = value.replace(/\s/g, ' '); // Ersetzt Whitespace durch ein einzelnes Leerzeichen.
  }

  get controlText(): Observable<string> {
    return this._controlText;
  }

  set controlText(value: Observable<string>) {
    if (this._controlText) {
      this._controlTextObserver.unsubscribe();
    }
    this._controlText = value;
    if (value) {
      this._controlTextObserver = value.subscribe(text => {
        debugger
        const s = text.split('\t');
        this.ueberschrift = s.pop();
      });
    }
  }

  addZuleitungszeile(zuleitung: string): void {
    this.zuleitungszeilen.push(zuleitung);
  }

  getNumberOfCopies(): number {
    return (this.zuleitungszeilen.length > 0) ? this.zuleitungszeilen.length : 1;
  }

  getRomanNumeral(): string {
    return romanize(this.ordinal);
  }
}
