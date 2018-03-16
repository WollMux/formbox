import { Container } from './container';
import { XmlClass } from '../../decorators/xml.decorators';

@XmlClass('hbox')
export class Hbox extends Container {

  toXml(): string {
    let xml = '<hbox>';
    xml += super.toXml();
    xml += '</hbox>';

    return xml;
  }
}
