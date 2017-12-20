import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { TemplateService } from './services/template.service';
import { OfficeService } from './services/office.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private templates: TemplateService) {
  }

  async ngOnInit(): Promise<void> {
    /* Empty */
  }

  onInsertDocument(): void {
    this.templates.insertDocument('Externer_Briefkopf').then(() => {
      this.templates.insertFragments();
    });
  }
}
