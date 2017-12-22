import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { TemplateService } from './services/template.service';
import { OfficeService } from './services/office.service';
import { TemplateActions } from './store/actions/template-actions';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { TemplateStatus } from './store/states/template-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
})
export class AppComponent implements OnInit {
  title = 'app';

  @select([ 'template', 'status' ]) templateStatus: Observable<TemplateStatus>;

  constructor(private templates: TemplateService, private actions: TemplateActions) {
  }

  async ngOnInit(): Promise<void> {
    /* Empty */
  }

  onInsertDocument(): void {
    this.actions.loadTemplate('Externer_Briefkopf');
  }
}
