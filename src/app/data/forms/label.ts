import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Label {
  @JsonProperty('label', String)
  label: string = undefined;
}
