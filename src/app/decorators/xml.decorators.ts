import 'reflect-metadata';
import { Form } from '../data/forms/form';

const xmlClasses: { [tag: string]: any } = {};

const tagNameKey = 'xml-tag-name';

export function XmlClass(tagName: string): any {
  return (target: any) => {
    xmlClasses[tagName] = target;
    Reflect.metadata(tagNameKey, tagName);
  };
}

export let getXmlTagName = (target: any) => {
  return Reflect.getMetadata(tagNameKey, target);
};

export let getXmlClass = (tag: string) => {
  if (tag in xmlClasses) {
    return xmlClasses[tag];
  }

  return undefined;
};
