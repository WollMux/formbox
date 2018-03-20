import { BaseControl } from './base-control';

export abstract class Control extends BaseControl {
  title: string = undefined;
  tip?: string;

  toXml(): string {
    let xml = super.toXml();
    xml += `<title>${this.title}</title>`;
    if (this.tip) {
      xml += `<tip>${this.tip}</tip>`;
    }

    return xml;
  }
}
