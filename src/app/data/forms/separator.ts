import { BaseControl } from './base-control';
import { XmlClass } from '../../decorators/xml.decorators';
import { Content } from './content';

@XmlClass('separator')
export class Separator extends BaseControl implements Content {

  constructor(c?: Separator) {
    super(c);
  }

  toXml(): string {
    let xml = '<separator>';
    xml += super.toXml();
    xml += '</separator>';

    return xml;
  }
}
