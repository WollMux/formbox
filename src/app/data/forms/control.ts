import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export abstract class Control {
  @JsonProperty('id', String)
  id: string = undefined;
}
