import { Label } from './label';
import { XmlClass } from "../../decorators/xml.decorators";

@XmlClass('textfield')
export class Textfield extends Label {
  tip?: string = undefined;

  readonly?: boolean = undefined;

  autofill?: boolean = undefined;

  toXml(): string {
    let xml = '<textfield>';
    xml += `<id>${this.id}</id>`;
    xml += `<title>${this.title}</title>`;
    if (this.tip) {
      xml += `<tip>${this.tip}</tip>`;
    }
    if (this.readonly) {
      xml += `<readonly>${this.readonly}</readonly>`;
    }
    if (this.autofill) {
      xml += `<autofill>${this.autofill}</autofill>`;
    }
    xml += '</textfield>';

    return xml;
  }
}
