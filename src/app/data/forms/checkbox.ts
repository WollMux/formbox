import { XmlClass } from '../../decorators/xml.decorators';
import { FormControl } from './form-control';

@XmlClass('checkbox')
export class Checkbox extends FormControl {
  toXml(): string {
    let xml = '<checkbox>';
    xml += super.toXml();
    xml += '</checkbox>';

    return xml;
  }
}
