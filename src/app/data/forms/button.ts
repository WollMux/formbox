import { Control } from './control';
import { XmlClass } from '../../decorators/xml.decorators';

@XmlClass('button')
export class Button extends Control {
  action = '';
  value = '';
  disabled?: boolean;

  toXml(): string {
    let xml = '<button>';
    xml += super.toXml();
    xml += `<action>${this.action}</action>`;
    xml += `<value>${this.value}</value>`;
    if (this.disabled) {
      xml += `<disabled>${this.disabled}</disabled>`;
    }
    xml += '</button>';

    return xml;
  }
}
