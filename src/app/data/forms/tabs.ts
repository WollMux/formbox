import { Control } from './control';
import { Tab } from './tab';
import { XmlClass } from '../../decorators/xml.decorators';
import { Content } from './content';

@XmlClass('tabs')
export class Tabs extends Control implements Content {
  controls: Tab[] = [];

  constructor(c?: Tabs) {
    super(c);
    if (c) {
      this.controls = c.controls;
    }
  }

  toXml(): string {
    let xml = '<tabs>';
    xml += super.toXml();

    xml += '<pages>';
    for (const t of this.controls) {
      xml += t.toXml();
    }
    xml += '</pages>';

    xml += '</tabs>';

    return xml;
  }
}
