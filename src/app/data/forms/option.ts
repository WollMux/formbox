import { XmlClass } from '../../decorators/xml.decorators';
import { Control } from './control';

@XmlClass('option')
export class Option extends Control {
  value = '';

  toXml(): string {
    return `<option>${this.value}</option>`;
  }
}
