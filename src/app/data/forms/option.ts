import { XmlClass } from '../../decorators/xml.decorators';
import { Control } from './control';

@XmlClass('option')
export class Option extends Control {
  value = '';

  toXml(): string {
    let xml = '<option>';
    xml += `<id>${this.id}</id>`;
    xml += `<value>${this.value}</value>`;
    xml += '</option>';

    return xml;
  }
}
