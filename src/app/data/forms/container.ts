import { Control } from './control';
import { Content } from './content';

export abstract class Container extends Control {
  controls: Content[] = [];

  constructor(container?: Container) {
    super(container);
    if (container) {
      this.controls = container.controls.map(c => c.deepCopy());
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
