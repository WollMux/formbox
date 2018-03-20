import { BaseControl } from './base-control';
import { XmlClass } from '../../decorators/xml.decorators';
import { Content } from './content';

@XmlClass('separator')
export class Separator extends BaseControl implements Content {
  toXml(): string {
    let xml = '<separator>';
    xml += super.toXml();
    xml += '</separator>';

    return xml;
  }
}
