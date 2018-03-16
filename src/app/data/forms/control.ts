export abstract class Control {
  id: string = undefined;

  abstract toXml(): string;
}
