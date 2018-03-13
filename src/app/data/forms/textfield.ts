import { Label } from './label';
import { XmlClass } from "../../decorators/xml.decorators";

@XmlClass('textfield')
export class Textfield extends Label {
  tip?: string = undefined;

  readonly?: boolean = undefined;

  autofill?: boolean = undefined;
}
