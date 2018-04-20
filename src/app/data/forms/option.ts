import { XmlClass } from '../../decorators/xml.decorators';

@XmlClass('option')
export class Option {
  id = '';
  value = '';

  constructor(o?: Option) {
    if (o) {
      this.id = o.id;
      this.value = o.value;
    }
  }

  toXml(): string {
    let xml = '<option>';
    xml += `<id>${this.id}</id>`;
    xml += `<value>${this.value}</value>`;
    xml += '</option>';

    return xml;
  }
}
