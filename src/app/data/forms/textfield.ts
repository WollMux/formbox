import { FormControl } from './form-control';
import { XmlClass } from '../../decorators/xml.decorators';

@XmlClass('textfield')
export class Textfield extends FormControl {

  constructor(c?: Textfield) {
    super(c);
  }

  toXml(): string {
    let xml = '<textfield>';
    xml += super.toXml();
    xml += '</textfield>';

    return xml;
  }
}
