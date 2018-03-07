import { JsonObject, JsonProperty } from 'json2typescript';

import { Label } from './label';

@JsonObject
export class Button extends Label {
  @JsonProperty('action', String)
  action: string = undefined;

  @JsonProperty('value', String)
  value: string = undefined;

  @JsonProperty('disabled', Boolean, true)
  disabled?: boolean = undefined;
}
