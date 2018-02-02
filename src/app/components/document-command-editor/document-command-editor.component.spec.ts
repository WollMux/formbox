import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCommandEditorComponent } from './document-command-editor.component';

describe('DocumentCommandEditorComponent', () => {
  let component: DocumentCommandEditorComponent;
  let fixture: ComponentFixture<DocumentCommandEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentCommandEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentCommandEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
