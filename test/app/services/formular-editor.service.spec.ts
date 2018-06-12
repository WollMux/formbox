import { async, inject, TestBed } from '@angular/core/testing';

import { FormularEditorService } from '../../../src/app/services/formular-editor.service';
import { OfficeService } from '../../../src/app/services/office.service';
import { NgLoggerModule } from '@nsalaun/ng-logger';
import { environment } from '../../../src/environments/environment';
import { FormControl } from '@angular/forms';

describe('FormularEditorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgLoggerModule.forRoot(environment.loglevel)
      ],
      providers: [
        FormularEditorService,
        OfficeService
      ]
    });
  });

  it('deleteControl', async(inject([FormularEditorService], async (service: FormularEditorService) => {
    const spy = spyOn(service['office'], 'deleteContentControl');
    await service.deleteControl(undefined);
    expect(spy).not.toHaveBeenCalled();

    await service.deleteControl(1);
    expect(spy).toHaveBeenCalledWith(1);
  })));

  it('createEmptyForm', inject([FormularEditorService], async (service: FormularEditorService) => {
    const form = service.createEmptyForm();
    expect(form.title).toBe('Neues Formular');
    expect(form.id).toBeDefined();
    expect(form.controls).toEqual([]);
  }));

  it('createFormControl label', async(inject([FormularEditorService], async (service: FormularEditorService) => {
    const control = await service.createFormControl('label');
    expect(control).toBeDefined();
  })));

  it('createFormControl button', async(inject([FormularEditorService], async (service: FormularEditorService) => {
    const control = await service.createFormControl('button');
    expect(control).toBeDefined();
  })));

  it('createFormControl checkbox', async(inject([FormularEditorService], async (service: FormularEditorService) => {
    const spy = spyOn(service['office'], 'insertContentControl');
    const control = await service.createFormControl('checkbox');
    expect(control).toBeDefined();
    expect(spy).toHaveBeenCalledWith('', 'formgui', undefined, undefined, true, true);
  })));

  it('createFormControl visibility', async(inject([FormularEditorService], async (service: FormularEditorService) => {
    const spy = spyOn(service['office'], 'insertContentControl');
    const control = await service.createFormControl('visibility');
    expect(control).toBeDefined();
    expect(spy).not.toHaveBeenCalled();
  })));

  it('createFormControl tabs', async(inject([FormularEditorService], async (service: FormularEditorService) => {
    const control = await service.createFormControl('tabs');
    expect(control).toBeDefined();
  })));

  it('createFormControl tab', async(inject([FormularEditorService], async (service: FormularEditorService) => {
    const control = await service.createFormControl('tab');
    expect(control).toBeDefined();
  })));

  it('createFormControl textarea', async(inject([FormularEditorService], async (service: FormularEditorService) => {
    const spy = spyOn(service['office'], 'insertContentControl');
    const control = await service.createFormControl('textarea');
    expect(control).toBeDefined();
    expect(spy).toHaveBeenCalledWith('', 'formgui', undefined, undefined, true, true);
  })));

  it('createFormControl textfield', async(inject([FormularEditorService], async (service: FormularEditorService) => {
    const spy = spyOn(service['office'], 'insertContentControl');
    const control = await service.createFormControl('textfield');
    expect(control).toBeDefined();
    expect(spy).toHaveBeenCalledWith('', 'formgui', undefined, undefined, true, true);
  })));

  it('createFormControl hbox', async(inject([FormularEditorService], async (service: FormularEditorService) => {
    const control = await service.createFormControl('hbox');
    expect(control).toBeDefined();
  })));

  it('createFormControl combobox', async(inject([FormularEditorService], async (service: FormularEditorService) => {
    const spy = spyOn(service['office'], 'insertContentControl');
    const control = await service.createFormControl('combobox');
    expect(control).toBeDefined();
    expect(spy).toHaveBeenCalledWith('', 'formgui', undefined, undefined, true, true);
  })));

  it('createFormControl separator', async(inject([FormularEditorService], async (service: FormularEditorService) => {
    const control = await service.createFormControl('separator');
    expect(control).toBeDefined();
  })));

  it('createFormControl invalid', async(inject([FormularEditorService], async (service: FormularEditorService) => {
    const control = await service.createFormControl('invalid');
    expect(control).toBeUndefined();
  })));
});
