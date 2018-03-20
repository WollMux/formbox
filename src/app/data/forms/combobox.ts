import { XmlClass } from '../../decorators/xml.decorators';
import { Option } from './option';
import { FormControl } from './form-control';

@XmlClass('combobox')
export class Combobox extends FormControl {
  option: Option[] = [];
  editable = false;

  toXml(): string {
    let xml = '<combobox>';
    xml += super.toXml();
    xml += `<editable>${this.editable}</editable>`;
    for (const o of this.option) {
      xml += o.toXml();
    }
    xml += '</combobox>';

    return xml;
  }
}
