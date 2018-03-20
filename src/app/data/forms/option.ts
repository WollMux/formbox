import { XmlClass } from '../../decorators/xml.decorators';

@XmlClass('option')
export class Option {
  id = '';
  value = '';

  toXml(): string {
    let xml = '<option>';
    xml += `<id>${this.id}</id>`;
    xml += `<value>${this.value}</value>`;
    xml += '</option>';

    return xml;
  }
}
