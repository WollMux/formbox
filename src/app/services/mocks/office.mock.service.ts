import { Injectable } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';

@Injectable()
export class OfficeMockService {
  cmds = [
    { id: 0, cmd: '=insertFrag(\'Adresse_Angaben\')'.substr(1).trim() },
    { id: 1, cmd: '=insertFrag(\'Empfaengerfeld\')'.substr(1).trim() },
    { id: 100, cmd: '=insertFrag(\'Email\')'.substr(1).trim() }
  ];

  cmds1 = [
    { id: 0, cmd: '=insertFrag(\'Adresse_Angaben\')'.substr(1).trim() },
    { id: 1, cmd: '=insertFrag(\'Empfaengerfeld\')'.substr(1).trim() }
  ];

  cmds2 = [
    { id: 100, cmd: '=insertFrag(\'Email\')'.substr(1).trim() }
  ];

  xml = `<?xml version="1.0" encoding="utf-8" ?>
  <!DOCTYPE xml>
  <form
    xmlns="http://www.muenchen.de/formbox/forms"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.muenchen.de/formbox/forms http://www.muenchen.de/formbox/form.xsd">
    <id>myForm</id>
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
        <id>tabs</id>
        <pages>
          <tab>
            <id>tab1</id>
            <controls>
              <combobox>
                <id>combobox1</id>
                <title>Combobox 1</title>
                <ccid>1</ccid>
                <editable>true</editable>
                <options>
                  <option>
                    <id>1</id>
                    <value>Item1</value>
                  </option>
                  <option>
                    <id>2</id>
                    <value>Item2</value>
                  </option>
                  <option>
                    <id>3</id>
                    <value>Item3</value>
                  </option>
                  <option>
                    <id>4</id>
                    <value>Item4</value>
                  </option>
                </options>
              </combobox>
              <label>
                <id>label1</id>
                <title>Label1</title>
              </label>
              <textfield>
                <id>textfeld1</id>
                <title>Eingabefeld</title>
                <tip></tip>
                <ccid>2</ccid>
                <readonly>false</readonly>
                <autofill>Text</autofill>
              </textfield>
              <textarea>
                <id>textare1</id>
                <title>Eingabefeld mehrzeilig</title>
                <tip></tip>
                <ccid>3</ccid>
                <readonly>false</readonly>
                <autofill>Text</autofill>
                <lines>3</lines>
                <wrap>true</wrap>
              </textarea>
            </controls>
            <title>Tab 1</title>
            <tip></tip>
          </tab>
          <tab>
            <id>tab2</id>
            <controls>
              <checkbox>
                <id>checkbox1</id>
                <title>Checkbox 1</title>
                <ccid>4</ccid>
              </checkbox>
              <checkbox>
                <id>checkbox2</id>
                <title>Checkbox 1</title>
                <ccid>5</ccid>
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
            <title>Tab 2</title>
          </tab>
        </pages>
      </tabs>
    </controls>
  </form>`;

  constructor(private log: Logger) { }

  async openDocument(base64: string): Promise<void> {
    this.log.debug('OfficeMockService.openDocument');

    return Promise.resolve();
  }

  async showDocument(): Promise<void> {
    this.log.debug('OfficeMockService.showDocument');

    return Promise.resolve();
  }

  async getDocumentCommands(): Promise<{ id: number, cmd: string }[]> {
    this.log.debug('OfficeMockService.getDocumentCommands');

    let ret;

    if (this.cmds1) {
      ret = this.cmds1.slice();
    }
    if (this.cmds2) {
      this.cmds1 = this.cmds2.slice();
      this.cmds2 = undefined;
    } else {
      this.cmds1 = undefined;
    }

    return Promise.resolve(ret);
  }

  async getNextDocumentCommand(): Promise<{ id: number, cmd: string }> {
    this.log.debug('OfficeMockService.getNextDocumentCommand');

    return Promise.resolve(this.cmds.pop());
  }

  async getRangeBetweenContentControls(id: number, idNext: number): Promise<Word.Range> {
    return Promise.reject('Not implemented.');
  }

  async insertContentControl(title: string, tag: string): Promise<number> {
    this.log.debug('OfficeMockService.insertContentControl');

    return Promise.resolve(0);
  }

  async updateContentControl(id: number, title: string, tag: string): Promise<void> {
    this.log.debug('OfficeMockService.updateContentControl');
  }

  async deleteContentControl(id: number): Promise<void> {
    this.log.debug('OfficeMockService.deleteContentControl');

    return Promise.resolve();
  }

  async insertFragment(id: number, base64: string): Promise<void> {
    this.log.debug('OfficeMockService.insertFragment');

    return Promise.resolve();
  }

  async insertValue(id: number, value: string): Promise<void> {
    return Promise.resolve();
  }

  async addXml(xml: string): Promise<string> {
    return Promise.resolve('form');
  }

  async getXmlById(id: string): Promise<string> {
    return Promise.resolve(this.xml);
  }

  async getXmlIdsByNamespace(ns: string): Promise<string[]> {
    return Promise.resolve([this.xml]);
  }

  async deleteXmlById(id: string): Promise<void> {
    return Promise.resolve();
  }

  async deleteXmlByNamespace(ns: string): Promise<void> {
    return Promise.resolve();
  }

  async selectContentControlById(contentControlId: number): Promise<number> {
    return Promise.resolve(1);
  }

  async openDialog(url: string, dialogHeight: number, dialogWidth: number): Promise<void> {
    return Promise.reject('Not implemented.');
  }

  async hideRange(range: Word.Range): Promise<void> {
    return Promise.resolve();
  }

  async unhideRange(range: Word.Range): Promise<void> {
    return Promise.resolve();
  }

  async isInsideContentControl(range?: Word.Range): Promise<{ id: number, title: string, tag: string }> {
    return Promise.resolve(undefined);
  }

  async getContentControlsInRange(range?: Word.Range): Promise<{ id: number, title: string, tag: string, text: string }[]> {
    return Promise.resolve([]);
  }

  async untrack(o: any): Promise<{}> {
    return Promise.resolve({});
  }

  async expandRangeToParagraph(range?: Word.Range): Promise<Word.Range> {
    return Promise.resolve(undefined);
  }

  async insertContentControlAroundParagraph(title: string, tag: string, style?: string): Promise<number> {
    return Promise.resolve(1);
  }

  async getContentControlText(id: number): Promise<string> {
    return Promise.resolve('');
  }

  async bindToContentControl(id: number, prefix: string): Promise<string> {
    return Promise.resolve('bind123');
  }

  async getNextContentControls(id?: number): Promise<{ id: number, title: string, tag: string }[]> {
    return Promise.resolve([]);
  }

  async deleteBinding(id: string): Promise<void> {
    return Promise.resolve();
  }

  async addEventHandlerToBinding(id: string, callback: (text: string) => void): Promise<void> {
    return Promise.resolve();
  }

  async removeEventHandlersFromBinding(id: string): Promise<void> {
    return Promise.resolve();
  }

  async replaceTextInContentControl(id: number, text: string): Promise<void> {
    return Promise.resolve();
  }
}
