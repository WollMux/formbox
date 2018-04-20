import { Control } from './control';
import { XmlClass } from '../../decorators/xml.decorators';
import { Container } from './container';

@XmlClass('form')
export class Form extends Container {
  title: string;

  constructor(c?: Form) {
    super(c);
    if (c) {
      this.title = c.title;
    }
  }

  toXml(): string {
    // tslint:disable-next-line:max-line-length
    let xml = '<form xmlns="http://www.muenchen.de/formbox/forms" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.muenchen.de/formbox/forms http://www.muenchen.de/formbox/form.xsd">';
    xml += super.toXml();
    xml += `<title>${this.title}</title>`;
    xml += '</form>';

    return xml;
  }
}
