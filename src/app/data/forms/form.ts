import { Control } from './control';
import { XmlClass } from '../../decorators/xml.decorators';

@XmlClass('form')
export class Form {
  title = '';

  controls: Control[] = [];

  toXml(): string {
    // tslint:disable-next-line:max-line-length
    let xml = '<form xmlns="http://www.muenchen.de/formbox/forms" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.muenchen.de/formbox/forms http://www.muenchen.de/formbox/form.xsd">';
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
