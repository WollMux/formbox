import { Label } from './label';

import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Textfield extends Label {
  @JsonProperty('tip', String, true)
  tip?: string = undefined;

  @JsonProperty('readonly', Boolean, true)
  readonly?: boolean = undefined;

  @JsonProperty('autofill', Boolean, true)
  autofill?: boolean = undefined;
}
