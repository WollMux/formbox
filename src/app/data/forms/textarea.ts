import { Textfield } from './textfield';

import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Textarea extends Textfield {
  @JsonProperty('lines', Number)
  lines: number = undefined;

  @JsonProperty('wrap', Boolean)
  wrap: boolean = undefined;
}
