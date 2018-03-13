import { Control } from './control';
import { XmlClass } from '../../decorators/xml.decorators';

@XmlClass('form')
export class Form {
  title = '';

  controls: Control[] = [];
}
