import { XmlClass } from '../../decorators/xml.decorators';
import { TitelControl } from './titel-control';

@XmlClass('label')
export class Label extends TitelControl {
  title = '';

  constructor(c?: Label) {
    super(c);
    if (c) {
      this.title = c.title;
    }
  }

  toXml(): string {
    let xml = '<label>';
    xml += super.toXml();
    xml += '</label>';

    return xml;
  }

  deepCopy(): Label {
    return new Label(this);
  }
}
