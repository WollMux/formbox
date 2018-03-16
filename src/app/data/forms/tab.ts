import { Control } from './control';
import { XmlClass } from '../../decorators/xml.decorators';

@XmlClass('tab')
export class Tab {
  title: string;

  tooltip?: string;

  controls: Control[] = [];

  toXml(): string {
    let xml = '<tab>';
    xml += `<title>${this.title}</title>`;
    if (this.tooltip) {
      xml += `<tooltip>${this.tooltip}</tooltip>`;
    }

    xml += '<controls>';
    for (const c of this.controls) {
      xml += c.toXml();
    }
    xml += '</controls>';

    xml += '</tab>';

    return xml;
  }
}
