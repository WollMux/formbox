import { TitelControl } from './titel-control';

export abstract class FormControl extends TitelControl {
  ccid: number = undefined;
  readonly?: boolean = undefined;
  autofill?: string = undefined;
  // nur für FormularGui relevant, deshalb nicht in Formularbeschreibung.
  value?: string = undefined;

  constructor(c?: FormControl) {
    super(c);
    if (c) {
      this.ccid = c.ccid;
      if (c.readonly) {
        this.readonly = c.readonly;
      }
      if (c.autofill) {
        this.autofill = c.autofill;
      }
    }
  }

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
