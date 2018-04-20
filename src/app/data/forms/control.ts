import { BaseControl } from './base-control';

export abstract class Control extends BaseControl {
  title: string = undefined;
  tip?: string;

  constructor(c?: Control) {
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
