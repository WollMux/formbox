import { XmlClass } from '../../decorators/xml.decorators';
import { Container } from './container';

@XmlClass('tab')
export class Tab extends Container {
  title = '';
  tip?: string;

  constructor(c?: Tab) {
    super(c);
    if (c) {
      this.title = c.title;
      if (c.tip) {
        this.tip = c.tip;
      }
    }
  }

  toXml(): string {
    let xml = '<tab>';
    xml += super.toXml();

    xml += `<title>${this.title}</title>`;
    if (this.tip) {
      xml += `<tip>${this.tip}</tip>`;
    }

    xml += '</tab>';

    return xml;
  }

  deepCopy(): Tab {
    return new Tab(this);
  }
}
