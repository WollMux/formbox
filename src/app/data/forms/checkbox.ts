import { XmlClass } from '../../decorators/xml.decorators';
import { FormControl } from './form-control';

@XmlClass('checkbox')
export class Checkbox extends FormControl {

  constructor(c?: Checkbox) {
    super(c);
  }

  toXml(): string {
    let xml = '<checkbox>';
    xml += super.toXml();
    xml += '</checkbox>';

    return xml;
  }
}
