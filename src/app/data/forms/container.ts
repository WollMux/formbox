import { Control } from './control';

import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export abstract class Container extends Control {
  @JsonProperty('controls', [Control], true)
  controls: Control[] = undefined;
}
