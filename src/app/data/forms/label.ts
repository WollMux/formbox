import { XmlClass } from '../../decorators/xml.decorators';
import { Control } from './control';

@XmlClass('label')
export class Label extends Control {
  title = '';

  toXml(): string {
    let xml = '<label>';
    xml += `<id>${this.id}</id>`;
    xml += `<title>${this.title}</title>`;
    xml += '</label>';

    return xml;
  }
}
