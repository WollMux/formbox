import { Control } from './control';
import { Tab } from './tab';
import { XmlClass } from '../../decorators/xml.decorators';

@XmlClass('tabs')
export class Tabs extends Control {
  pages: Tab[] = [];

  toXml(): string {
    let xml = '<tabs>';
    xml += `<id>${this.id}</id>`;

    xml += '<pages>';
    for (const t of this.pages) {
      xml += t.toXml();
    }
    xml += '</pages>';

    xml += '</tabs>';

    return xml;
  }
}
