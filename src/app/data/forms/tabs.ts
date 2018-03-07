import { Control } from './control';
import { Tab } from './tab';

import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Tabs extends Control {
  @JsonProperty('pages', [[Tab]], true)
  pages: Tab[] = undefined;
}
