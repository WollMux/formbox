import { Control } from './control';

export abstract class Container extends Control {
  controls: Control[] = [];

  toXml(): string {
    let xml = `<id>${this.id}</id>`;
    xml += '<controls>';
    for (const c of this.controls) {
      xml += c.toXml();
    }
    xml += '</controls>';

    return xml;
  }
}
