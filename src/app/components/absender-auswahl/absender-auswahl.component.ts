import { Component, OnDestroy, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Logger } from '@nsalaun/ng-logger';

import { Absender } from '../../storage/absender';
import { AbsenderlisteActions } from '../../store/actions/absenderliste-actions';

@Component({
  selector: 'app-absender-auswahl',
  templateUrl: './absender-auswahl.component.html',
  styleUrls: ['./absender-auswahl.component.css']
})
export class AbsenderAuswahlComponent implements OnInit {
  @select(['absenderliste', 'pal']) pal: Observable<Absender[]>;
  @select(['absenderliste', 'selected']) selected: Observable<Absender>;

  constructor(
    private log: Logger,
    private actions: AbsenderlisteActions
  ) { }

  ngOnInit(): void {
    // nothing to initialize
  }

  changeAbsender(id: number): void {
    this.actions.changeAbsender(id);
  }

}
