import { Component, OnInit } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store/lib/src';
import { Observable } from 'rxjs/Observable';

import { TemplateActions } from '../../store/actions/template-actions';
import { SachleitendeVerfuegungService } from '../../services/sachleitende-verfuegung.service';
import { OfficeService } from '../../services/office.service';
import { SachleitendeverfuegungActions } from '../../store/actions/sachleitendeverfuegung-actions';
import { SachleitendeVerfuegung } from '../../data/slv/sachleitende-verfuegung';

@Component({
  selector: 'app-debug-component',
  templateUrl: './debug.component.html',
  styleUrls: [ './debug.component.css' ]
})
export class DebugComponent implements OnInit {
  @select([ 'slv', 'slv' ]) sachleitendeVerfuegung: Observable<SachleitendeVerfuegung>;

  constructor(
    private log: Logger,
    private router: Router,
    private templateActions: TemplateActions,
    private office: OfficeService,
    private slv: SachleitendeVerfuegungService,
    private slvActions: SachleitendeverfuegungActions
  ) { }

  async ngOnInit(): Promise<void> {
    // debug
  }

  performCommands(): void {
    this.templateActions.performCommands();
  }

  onSLV(): void {
    //    this.slv.newDocument().then(() => {
    //      return this.slv.copyCurrentDocument(true);
    //    }).then(() => {
    //      return this.slv.copyCurrentDocument();
    //    }).then(() => {
    //      this.slv.showDocument();
    // });
  }

  onHide(): void {
    this.sachleitendeVerfuegung.subscribe(it => {
      debugger
      this.slv.hideVerfuegungspunkt(it.verfuegungspunkte[ 0 ].id);
    });
  }

  onUnhide(): void {
  }

  async onVP(): Promise<void> {
    this.slvActions.toggle();
  }
}
