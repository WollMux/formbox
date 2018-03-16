import { Label } from './label';
import { XmlClass } from '../../decorators/xml.decorators';

@XmlClass('button')
export class Button extends Label {
  action = '';

  value = '';

  disabled?: boolean;

  toXml(): string {
    let xml = '<button>';
    xml += `<id>${this.id}</id>`;
    xml += `<title>${this.title}</title>`;
    xml += `<action>${this.action}</action>`;
    xml += `<value>${this.value}</value>`;
    if (this.disabled) {
      xml += `<disabled>${this.disabled}</disabled>`;
    }
    xml += '</button>';

    return xml;
  }
}
