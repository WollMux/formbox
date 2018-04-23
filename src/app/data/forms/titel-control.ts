import { Control } from './control';

export abstract class TitelControl extends Control {
  title: string = undefined;
  tip?: string;

  constructor(c?: TitelControl) {
    super(c);
    if (c) {
      this.title = c.title;
      if (c.tip) {
        this.tip = c.tip;
      }
    }
  }

  toXml(): string {
    let xml = super.toXml();
    xml += `<title>${this.title}</title>`;
    if (this.tip) {
      xml += `<tip>${this.tip}</tip>`;
    }

    return xml;
  }
}
