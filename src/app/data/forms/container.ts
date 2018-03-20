import { BaseControl } from './base-control';
import { Content } from './content';

export abstract class Container extends BaseControl {
  controls: Content[] = [];

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
