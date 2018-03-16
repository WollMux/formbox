import { Textfield } from './textfield';
import { XmlClass } from '../../decorators/xml.decorators';

@XmlClass('textarea')
export class Textarea extends Textfield {
  lines = 5;

  wrap = true;

  toXml(): string {
    let xml = '<textarea>';
    xml += `<id>${this.id}</id>`;
    xml += `<title>${this.title}</title>`;
    xml += `<lines>${this.lines}</lines>`;
    xml += `<wrap>${this.wrap}</wrap>`;
    xml += '</textarea>';

    return xml;
  }
}
