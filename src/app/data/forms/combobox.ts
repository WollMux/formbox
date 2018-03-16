import { Label } from './label';
import { XmlClass } from '../../decorators/xml.decorators';

@XmlClass('combobox')
export class Combobox extends Label {
  toXml(): string {
    let xml = '<combobox>';
    xml += `<id>${this.id}</id>`;
    xml += `<title>${this.title}</title>`;
    xml += '</combobox>';

    return xml;
  }
}
