import { Injectable } from '@angular/core';
import { parser, QualifiedTag, SAXParser, Tag } from 'sax';
import * as format from 'xml-formatter';
import { Logger } from '@nsalaun/ng-logger';
import '../data/forms/forms';
import { getXmlClass } from '../decorators/xml.decorators';
import { Form } from '../data/forms/form';
import { Container } from '../data/forms/container';
import { Tabs } from '../data/forms/tabs';
import { Tab } from '../data/forms/tab';

/**
 * Parser für Formulardefinition in XML.
 */
@Injectable()
export class FormXmlParserService {
  private parser: SAXParser;

  private root = undefined;
  private containers = [];
  private currentContainer = undefined;
  private currentProperty = undefined;

  constructor(private log: Logger) {
    this.parser = parser(true, { trim: true, normalize: true });
    this.parser.onopentag = this.onopentag;
    this.parser.ontext = this.ontext;
    this.parser.onclosetag = this.onclosetag;
    this.parser.onend = this.onend;
  }

  /**
   * Parst Formulardefinition in XML und gibt ein Form-Objekt zurück. 
   */
  parse(xml: string): Form {
    this.parser.write(xml);
    this.parser.close();

    return this.root;
  }

  /**
   * Wandelt ein Form-Objekt nach XML um.
   * 
   * @param pretty Formatiert das XML.
   */
  createXml(form: Form, pretty = false): string {
    let xml = form.toXml();
    if (pretty) {
      xml = format(xml);
    }

    return xml;
  }

  private onopentag = (node: Tag | QualifiedTag) => {
    // Zuerst wird nach einer Klasse gesucht, die mit @XmlClass dem Tag zugeordnet wurde.
    const xmlClass = getXmlClass(node.name);
    if (xmlClass) {
      const o = new xmlClass();

      if (this.currentContainer && this.currentContainer.hasOwnProperty('controls')) {
        this.currentContainer.controls.push(o);
      } else if (this.currentContainer instanceof Tabs) {
        this.currentContainer.pages.push(o);
      }

      if (!this.root) {
        this.root = o;
      }
      this.push(o);
    } else {
      // Alle Tags, die sich keiner Klasse zuordnen lassen, sind Properties.
      if (this.currentContainer[ node.name ] && this.currentContainer[ node.name ].constructor === Array) {
        return;
      }
      this.currentProperty = node.name;
    }
  }

  private ontext = text => {
    // Zur Laufzeit kann nicht geprüft werden, ob ein Property existiert. Wir hoffen also das Beste.
    if (this.currentProperty) {
      this.currentContainer[ this.currentProperty ] = text;
    }
  }

  private onclosetag = (tagName: string) => {
    const xmlClass = getXmlClass(tagName);
    if (xmlClass) {
      if (xmlClass.name === this.currentContainer.constructor.name) {
        this.pop();
      }
    }
  }

  private onend = () => {
    this.log.debug(this.root);
  }

  private push(o): void {
    if (this.currentContainer) {
      this.containers.push(this.currentContainer);
    }
    this.currentContainer = o;
  }

  private pop(): void {
    if (this.containers.length > 0) {
      this.currentContainer = this.containers.pop();
    }
  }
}
