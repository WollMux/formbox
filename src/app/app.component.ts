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
import { FormDataService } from './services/form-data.service';
import { Form } from './data/forms/form';
import { Label } from './data/forms/label';
import { Button } from './data/forms/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  title = 'app';

  @select([ 'template', 'status' ]) templateStatus: Observable<LoadingStatus>;
  @select([ 'absenderliste', 'selected' ]) absender: Observable<Absender>;

  constructor(
    private router: Router,
    private templates: TemplateService,
    private actions: TemplateActions,
    private absenderlisteActions: AbsenderlisteActions,
    private storageActions: StorageActions,
    private storage: StorageService,
    private expressions: ExpressionsService,
    private formdata: FormDataService,
    private log: Logger) {
  }

  async ngOnInit(): Promise<void> {
    this.log.debug('AppComponent.ngOnInit');

    this.router.navigate(['/document-treeview']);

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

  onTestXml(): void {
    const f = new Form();
    f.title = 'Form 1';
    f.controls = [
      new Label(),
      new Button()
    ];

    this.formdata.write(f).then(id => {
      // console.log(id);
      this.formdata.read().then(form => {
        // console.log(form);
      });
    });
  }
}
