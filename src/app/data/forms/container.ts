import { Control } from './control';

export abstract class Container extends Control {
  controls: Control[] = [];
}
