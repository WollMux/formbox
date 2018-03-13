import { Label } from './label';
import { XmlClass } from '../../decorators/xml.decorators';

@XmlClass('button')
export class Button extends Label {
  action: string = undefined;

  value: string = undefined;

  disabled?: boolean = undefined;
}
