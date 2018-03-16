import { Label } from './label';
import { XmlClass } from '../../decorators/xml.decorators';

@XmlClass('checkbox')
export class Checkbox extends Label {
  toXml(): string {
    let xml = '<checkbox>';
    xml += `<id>${this.id}</id>`;
    xml += `<title>${this.title}</title>`;
    xml += '</checkbox>';

    return xml;
  }
}
