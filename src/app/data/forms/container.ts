import { Control } from './control';
import { Content } from './content';

export abstract class Container extends Control {
  controls: Content[] = [];

  constructor(c?: Container) {
    super(c);
    if (c) {
      this.controls = c.controls;
    }
  }

  toXml(): string {
    let xml = super.toXml();
    xml += '<controls>';
    for (const c of this.controls) {
      xml += c.toXml();
    }
    xml += '</controls>';

    return xml;
  }
}
