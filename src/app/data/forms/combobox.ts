import { XmlClass } from '../../decorators/xml.decorators';
import { Option } from './option';
import { FormControl } from './form-control';

@XmlClass('combobox')
export class Combobox extends FormControl {
  options: Option[] = [];
  editable = false;

  constructor(c?: Combobox) {
    super(c);
    if (c) {
      this.editable = c.editable;
      this.options = c.options.map(o => new Option(o));
    }
  }

  toXml(): string {
    let xml = '<combobox>';
    xml += super.toXml();
    xml += `<editable>${this.editable}</editable>`;
    xml += '<options>';
    for (const o of this.options) {
      xml += o.toXml();
    }
    xml += '</options>';
    xml += '</combobox>';

    return xml;
  }

  deepCopy(): Combobox {
    return new Combobox(this);
  }
}
