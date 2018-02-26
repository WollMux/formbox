import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { LoadingStatus } from './store/states/template-state';
import { Logger } from '@nsalaun/ng-logger';

import { StorageService } from './services/storage.service';
import { TemplateService } from './services/template.service';
import { OfficeService } from './services/office.service';
import { TemplateActions } from './store/actions/template-actions';
import { AbsenderlisteActions } from './store/actions/absenderliste-actions';
import { ExpressionsService } from './services/expressions.service';
import { Absender } from './storage/absender';
import { StorageActions } from './store/actions/storage-actions';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  @select(['template', 'status']) templateStatus: Observable<LoadingStatus>;
  @select(['absenderliste', 'selected']) absender: Observable<Absender>;

  constructor(
    private templates: TemplateService,
    private actions: TemplateActions,
    private absenderlisteActions: AbsenderlisteActions,
    private storageActions: StorageActions,
    private storage: StorageService,
    private expressions: ExpressionsService,
    private log: Logger) {
  }

  async ngOnInit(): Promise<void> {
    this.log.debug('AppComponent.ngOnInit');

    if (environment.production || !environment.test) {
      this.storage.open().then(() => {
        this.absenderlisteActions.loadAbsenderState();
      });
    } else {
      this.storage.reset().then(() => {
        this.absenderlisteActions.loadAbsenderState();
      });
    }

    this.templateStatus.subscribe(status => {
      this.log.debug(status);
    });
  }

  onInsertDocument(): void {
    this.actions.loadTemplate('Externer_Briefkopf');
  }
}
