import { TitelControl } from './titel-control';
import { XmlClass } from '../../decorators/xml.decorators';

@XmlClass('button')
export class Button extends TitelControl {
  action = '';
  value = '';
  disabled?: boolean;

  constructor(c?: Button) {
    super(c);
    if (c) {
      this.action = c.action;
      this.value = c.value;
      if (c.disabled) {
        this.disabled = c.disabled;
      }
    }
  }

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

  deepCopy(): Button {
    return new Button(this);
  }
}
