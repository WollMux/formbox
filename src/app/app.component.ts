import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { TemplateService } from './services/template.service';
import { OfficeService } from './services/office.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private templates: TemplateService, private office: OfficeService) {
  }

  async ngOnInit(): Promise<void> {
    this.templates.getTemplateUrl('Externer_Briefkopf').then(path => {
      this.templates.getFileAsBase64(path).then(s => {
        this.office.insertDocument(s, 'Replace');
      });
    });
  }
}
