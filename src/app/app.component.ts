import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { TemplateStatus } from './store/states/template-state';
import { Logger } from '@nsalaun/ng-logger';

import { StorageService } from './services/storage.service';
import { TemplateService } from './services/template.service';
import { OfficeService } from './services/office.service';
import { TemplateActions } from './store/actions/template-actions';
import { AbsenderlisteActions } from './store/actions/absenderliste-actions';
import { ExpressionsService } from './services/expressions.service';
import { AbsenderlisteState } from './store/states/absender-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  title = 'app';

  @select([ 'template', 'status' ]) templateStatus: Observable<TemplateStatus>;
  @select([ 'absender', 'selected' ]) absender: Observable<AbsenderlisteState>;

  constructor(
    private templates: TemplateService,
    private actions: TemplateActions,
    private absenderlisteActions: AbsenderlisteActions,
    private storage: StorageService,
    private expressions: ExpressionsService,
    private log: Logger) {
  }

  async ngOnInit(): Promise<void> {
    this.log.debug('AppComponent.ngOnInit');

    this.storage.reset().then(() => {
      this.absenderlisteActions.loadAbsenderliste();
    });

    this.templateStatus.subscribe(status => {
      this.log.debug(status);
    });

  }

  onInsertDocument(): void {
    this.actions.loadTemplate('Externer_Briefkopf');
  }

  onAbsender(): void {
    this.absenderlisteActions.changeAbsender(1);
    this.absender.subscribe(ab => {
      console.log(this.expressions.eval('vorname + " " + name'));
      console.log(this.expressions.eval('overrideFrag("Adresse_Angaben", "Neue_Adresse")'));
      console.log(this.expressions.eval('overrideFrag("Email", "Neue_Email")'));
      console.log(this.expressions.eval('overrideFrag("Adresse_Angaben", "Neue_Adresse2")'));
      console.log(this.expressions.eval('insertFrag("Adresse_Angaben")'));
      console.log(this.expressions.eval('insertFrag("Zusatz")'));
    });
  }
}
