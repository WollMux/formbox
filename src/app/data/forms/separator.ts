import { Control } from './control';
import { XmlClass } from '../../decorators/xml.decorators';

@XmlClass('separator')
export class Separator extends Control {
  toXml(): string {
    let xml = '<separator>';
    xml += `<id>${this.id}</id>`;
    xml += '</separator>';

    return xml;
  }
}
