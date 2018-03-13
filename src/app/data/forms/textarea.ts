import { Textfield } from './textfield';
import { XmlClass } from '../../decorators/xml.decorators';

@XmlClass('textarea')
export class Textarea extends Textfield {
  lines: number = undefined;

  wrap: boolean = undefined;
}
