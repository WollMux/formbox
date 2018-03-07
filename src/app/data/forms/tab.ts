import { Control } from './control';

import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Tab {
  @JsonProperty('title', String)
  title: string = undefined;

  @JsonProperty('tooltip', String, true)
  tooltip?: string = undefined;

  @JsonProperty('controls', [Control], true)
  controls: Control[] = undefined;
}
