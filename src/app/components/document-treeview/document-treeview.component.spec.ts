import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTreeviewComponent } from './document-treeview.component';

describe('DocumentTreeviewComponent', () => {
  let component: DocumentTreeviewComponent;
  let fixture: ComponentFixture<DocumentTreeviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentTreeviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTreeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
