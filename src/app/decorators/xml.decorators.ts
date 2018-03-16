import 'reflect-metadata';
import { Form } from '../data/forms/form';

const xmlClasses: { [tag: string]: any } = {};

const tagNameKey = 'xml-tag-name';

/**
 * Class-Decorator, der eine Klasse mit einem XML-Tag assoziiert.
 * Wird von FormXmlParser verwendet um die XML-Tags zu den
 * Datenklassen zuzuordnen.
 * 
 * @param tagName Name des XML-Tags.
 */
export function XmlClass(tagName: string): any {
  return (target: any) => {
    xmlClasses[tagName] = target;
  };
}

/**
 * Gibt die Klasse zurück, die einem XML-Tag zugeordnet ist.
 * 
 * @returns Constructor-Funktion der Klasse.
 */
export let getXmlClass = (tag: string) => {
  if (tag in xmlClasses) {
    return xmlClasses[tag];
  }

  return undefined;
};
