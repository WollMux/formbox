export abstract class Control {
  id: string;

  constructor(c?: Control) {
    if (c) {
      this.id = c.id;
    }
  }

  toXml(): string {
    return `<id>${this.id}</id>`;
  }
}
