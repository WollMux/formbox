import { BaseControl } from './base-control';
import { Tab } from './tab';
import { XmlClass } from '../../decorators/xml.decorators';
import { Content } from './content';

@XmlClass('tabs')
export class Tabs extends BaseControl implements Content {
  controls: Tab[] = [];

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
