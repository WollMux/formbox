import { Injectable } from '@angular/core';
import { OfficeService } from './office.service';
import { Form } from '../data/forms/form';
import { FormXmlParserService } from './form-xml-parser.service';

/**
 * Service zum Bearbeiten von Formulardefinitionen.
 */
@Injectable()
export class FormDataService {
  static readonly namespace = 'http://www.muenchen.de/formbox/forms';

  xml = `<form xmlns="http://www.muenchen.de/formbox/forms" 
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
      xsi:schemaLocation="http://www.muenchen.de/formbox/forms http://www.muenchen.de/formbox/form.xsd">
    <title>Title</title>
    <controls>
      <label>
        <id>Label1</id>
        <title>Label 1</title>
      </label>
      <label>
        <id>Label2</id>
        <title>Label 2</title>
      </label>
      <tabs>
        <id>tab1</id>
        <pages>
          <tab>
           <title>Tab 1</title>
           <tooltip></tooltip>
           <controls>
             <label>
               <id>label1</id>
               <title>Label1</title>
             </label>
             <textfield>
               <id>textfeld1</id>
               <title>Eingabefeld</title>
               <tip></tip>
               <readonly>false</readonly>
               <autofill>Text</autofill>
             </textfield>
           </controls>
          </tab>
          <tab>
           <title>Tab 2</title>
           <controls>
             <checkbox>
               <id>checkbox1</id>
               <title>Checkbox 1</title>
             </checkbox>
             <checkbox>
               <id>checkbox2</id>
               <title>Checkbox 1</title>
             </checkbox>
             <separator>
               <id>separator1</id>
             </separator>
             <hbox>
               <id>hbox1</id>
               <controls>
                 <button>
                   <id>button1</id>
                   <title>Button 1</title>
                   <action>openTemplate</action>
                   <value>fragId</value>
                 </button>
                 <button>
                   <id>button2</id>
                   <title>Button 2</title>
                   <action>openExt</action>
                   <value>explorer.exe</value>
                   <disabled>true</disabled>
                 </button>
               </controls>
             </hbox>
           </controls>
          </tab>
        </pages>
      </tabs>
    </controls>
  </form>
  `;

  constructor(private office: OfficeService, private formXmlParser: FormXmlParserService) { }

  /**
   * Schreibt CustomXML in das aktuelle Dokument. 
   */
  async write(xml: string): Promise<string> {
    return this.office.deleteXmlByNamespace(FormDataService.namespace).then(() => {
      return this.office.addXml(xml);
    });
  }

  /**
   * Liest CustomXML aus dem aktuellen Dokument.
   */
  async read(): Promise<string> {
    return this.office.getXmlIdsByNamespace(FormDataService.namespace).then(ids => {
      if (ids.length > 0) {
        return this.office.getXmlById(ids.pop());
      } else {
        return Promise.reject('No FormData found.');
      }
    });
  }

  /**
   * Löscht CustomXML aus dem aktuellen Dokument.
   */
  async clear(): Promise<void> {
    this.office.deleteXmlByNamespace(FormDataService.namespace);
  }

  /**
   * Parst Formulardefinition in XML und gibt ein Form-Objekt zurück. 
   */
  parse(xml: string): Form {
    return this.formXmlParser.parse(xml);
  }
}
