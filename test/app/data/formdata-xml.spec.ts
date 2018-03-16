import { Form } from '../../../src/app/data/forms/form';
import { Button } from '../../../src/app/data/forms/button';
import { Checkbox } from '../../../src/app/data/forms/checkbox';
import { Hbox } from '../../../src/app/data/forms/hbox';
import { Label } from '../../../src/app/data/forms/label';
import { Separator } from '../../../src/app/data/forms/separator';
import { Tabs } from '../../../src/app/data/forms/tabs';
import { Tab } from '../../../src/app/data/forms/tab';
import { Textarea } from '../../../src/app/data/forms/textarea';
import { Textfield } from '../../../src/app/data/forms/textfield';

describe('Formdata XML', () => {
  it('writing Form as XML', () => {
    const f = new Form();
    f.title = 'Form 1';

    expect(f.toXml()).toEqual('<form xmlns="http://www.muenchen.de/formbox/forms" ' +
      'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
      + 'xsi:schemaLocation="http://www.muenchen.de/formbox/forms http://www.muenchen.de/formbox/form.xsd">' +
      '<title>Form 1</title><controls></controls></form>');
  });

  it('writing Button as XML', () => {
    const b = new Button();
    b.id = 'button1';
    b.title = 'Button 1';
    b.action = 'Action';
    b.value = 'Value';

    expect(b.toXml()).toEqual('<button><id>button1</id><title>Button 1</title><action>Action</action><value>Value</value></button>');
  });

  it('writing Checkbox as XML', () => {
    const cb = new Checkbox();
    cb.id = 'checkbox1';
    cb.title = 'CheckBox 1';

    expect(cb.toXml()).toEqual('<checkbox><id>checkbox1</id><title>CheckBox 1</title></checkbox>');
  });

  it('writing HBox as XML', () => {
    const hb = new Hbox();
    hb.id = 'hbox1';

    expect(hb.toXml()).toEqual('<hbox><id>hbox1</id><controls></controls></hbox>');
  });

  it('writing Label as XML', () => {
    const lb = new Label();
    lb.id = 'label1';
    lb.title = 'Label 1';

    expect(lb.toXml()).toEqual('<label><id>label1</id><title>Label 1</title></label>');
  });

  it('writing Separator as XML', () => {
    const sp = new Separator();
    sp.id = 'separator1';

    expect(sp.toXml()).toEqual('<separator><id>separator1</id></separator>');
  });

  it('writing Tabs as XML', () => {
    const tb = new Tabs();
    tb.id = 'tabs1';

    expect(tb.toXml()).toEqual('<tabs><id>tabs1</id><pages></pages></tabs>');
  });

  it('writing Tab as XML', () => {
    const tb = new Tab();
    tb.title = 'Tab 1';

    expect(tb.toXml()).toEqual('<tab><title>Tab 1</title><controls></controls></tab>');
  });

  it('writing Textarea as XML', () => {
    const ta = new Textarea();
    ta.id = 'textarea1';
    ta.title = 'Textarea 1';

    expect(ta.toXml()).toEqual('<textarea><id>textarea1</id><title>Textarea 1</title><lines>5</lines><wrap>true</wrap></textarea>');
  });

  it('writing Textfield as XML', () => {
    const tf = new Textfield();
    tf.id = 'textfield1';
    tf.title = 'Textfield 1';

    expect(tf.toXml()).toEqual('<textfield><id>textfield1</id><title>Textfield 1</title></textfield>');
  });
});
