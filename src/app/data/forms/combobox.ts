import { Label } from './label';
import { XmlClass } from '../../decorators/xml.decorators';
import { Option } from './option';

@XmlClass('combobox')
export class Combobox extends Label {
  option: Option[] = [];

  toXml(): string {
    let xml = '<combobox>';
    xml += `<id>${this.id}</id>`;
    xml += `<title>${this.title}</title>`;
    for (const o of this.option) {
      xml += o.toXml();
    }
    xml += '</combobox>';

    return xml;
  }
}
