import { Container } from './container';
import { XmlClass } from '../../decorators/xml.decorators';
import { Content } from './content';

@XmlClass('hbox')
export class Hbox extends Container implements Content {

  constructor(c?: Hbox) {
    super(c);
  }

  toXml(): string {
    let xml = '<hbox>';
    xml += super.toXml();
    xml += '</hbox>';

    return xml;
  }

  deepCopy(): Hbox {
    return new Hbox(this);
  }
}
