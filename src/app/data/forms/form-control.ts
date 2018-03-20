import { Control } from './control';

export abstract class FormControl extends Control {
  ccid: number = undefined;
  readonly?: boolean = undefined;
  autofill?: string = undefined;

  toXml(): string {
    let xml = super.toXml();
    xml += `<ccid>${this.ccid}</ccid>`;
    if (this.readonly) {
      xml += `<readonly>${this.readonly}</readonly>`;
    }
    if (this.autofill) {
      xml += `<autofill>${this.autofill}</autofill>`;
    }

    return xml;
  }
}
