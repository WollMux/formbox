import { Injectable } from '@angular/core';
import { OfficeService } from './office.service';
import { Form } from '../data/forms/form';
import * as fastXmlParser from 'fast-xml-parser';
import { JsonConvert, OperationMode } from 'json2typescript';

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
        <label>Label 1</label>
      </label>
      <label>
        <id>Label2</id>
        <label>Label 2</label>
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
               <label>Label1</label>
             </label>
             <textfield>
               <id>textfeld1</id>
               <label>Eingabefeld</label>
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
               <label>Checkbox 1</label>
             </checkbox>
             <checkbox>
               <id>checkbox2</id>
               <label>Checkbox 1</label>
             </checkbox>
             <separator>
               <id>separator1</id>
             </separator>
             <hbox>
               <id>hbox1</id>
               <controls>
                 <button>
                   <id>button1</id>
                   <label>Button 1</label>
                   <action>openTemplate</action>
                   <value>fragId</value>
                 </button>
                 <button>
                   <id>button2</id>
                   <label>Button 2</label>
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

  constructor(private office: OfficeService) { }

  async write(xml: string): Promise<string> {
    return this.office.deleteXmlByNamespace(FormDataService.namespace).then(() => {
      return this.office.addXml(xml);
    });
  }

  async read(): Promise<string> {
    return this.office.getXmlIdsByNamespace(FormDataService.namespace).then(ids => {
      if (ids.length > 0) {
        return this.office.getXmlById(ids.pop());
      } else {
        return Promise.reject('No FormData found.');
      }
    });
  }

  async clear(): Promise<void> {
    this.office.deleteXmlByNamespace(FormDataService.namespace);
  }

  parse(xml: string): Form {
    const options = { arrrayMode: false };
    const json = fastXmlParser.parse(xml, options);
    const jsonConvert = new JsonConvert();
    jsonConvert.operationMode = OperationMode.LOGGING;
    const form: Form = jsonConvert.deserialize(json.form, Form);
    console.log(form);
    return form;
  }
}
