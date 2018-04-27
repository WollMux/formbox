import { Control } from './control';

export interface Content {
  toXml(): string;
  deepCopy(c?: Control): Control;
}
