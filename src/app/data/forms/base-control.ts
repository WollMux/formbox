export abstract class BaseControl {
  id: string;

  constructor(c?: BaseControl) {
    if (c) {
      this.id = c.id;
    }
  }

  toXml(): string {
    return `<id>${this.id}</id>`;
  }
}
