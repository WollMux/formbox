import { Control } from './control';
import { XmlClass } from '../../decorators/xml.decorators';

@XmlClass('form')
export class Form {
  id: string;
  title: string;
  controls: Control[] = [];

  constructor(c?: Form) {
    if (c) {
      this.id = c.id;
      this.title = c.title;
      this.controls = c.controls;
    }
  }

  toXml(): string {
    let xml = '<form xmlns="http://www.muenchen.de/formbox/forms" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"';
    xml += ' xsi:schemaLocation="http://www.muenchen.de/formbox/forms http://www.muenchen.de/formbox/form.xsd">';
    xml += `<id>${this.id}</id>`;
    xml += `<title>${this.title}</title>`;
    xml += '<controls>';
    for (const c of this.controls) {
      xml += c.toXml();
    }
    xml += '</controls>';
    xml += '</form>';

    return xml;
  }
}
