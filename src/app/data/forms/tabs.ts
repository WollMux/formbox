import { Control } from './control';
import { Tab } from './tab';
import { XmlClass } from '../../decorators/xml.decorators';

@XmlClass('tabs')
export class Tabs extends Control {
  pages: Tab[] = [];
}
