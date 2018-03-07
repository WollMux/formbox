import { JsonObject, JsonProperty } from 'json2typescript';

import { Control } from './control';

@JsonObject
export class Form {
  @JsonProperty('title', String)
  title: string = undefined;

  @JsonProperty('controls', [Control], true)
  controls: Control[] = undefined;
}
