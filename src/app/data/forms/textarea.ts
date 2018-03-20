import { XmlClass } from '../../decorators/xml.decorators';
import { FormControl } from './form-control';

@XmlClass('textarea')
export class Textarea extends FormControl {
  lines = 5;
  wrap = true;

  toXml(): string {
    let xml = '<textarea>';
    xml += super.toXml();
    xml += `<lines>${this.lines}</lines>`;
    xml += `<wrap>${this.wrap}</wrap>`;
    xml += '</textarea>';

    return xml;
  }
}
