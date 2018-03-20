export abstract class BaseControl {
  id: string;

  toXml(): string {
    return `<id>${this.id}</id>`;
  }
}
