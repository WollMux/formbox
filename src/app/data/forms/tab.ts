import { Control } from './control';
import { XmlClass } from '../../decorators/xml.decorators';

@XmlClass('tab')
export class Tab {
  title: string;

  tooltip?: string;

  controls: Control[] = [];
}
