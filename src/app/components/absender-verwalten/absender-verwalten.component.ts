import { Component, OnDestroy, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Logger } from '@nsalaun/ng-logger';

import { Absender } from '../../storage/absender';
import { AbsenderlisteActions } from '../../store/actions/absenderliste-actions';
import { StorageActions } from '../../store/actions/storage-actions';

@Component({
  selector: 'app-absender-verwalten',
  templateUrl: './absender-verwalten.component.html',
  styleUrls: ['./absender-verwalten.component.css']
})
export class AbsenderVerwaltenComponent implements OnInit, OnDestroy {
  @select([ 'absenderliste', 'pal']) pal: Observable<Absender[]>;

  constructor(
    private log: Logger,
    private actions: AbsenderlisteActions,
    private storageActions: StorageActions
  ) { }

  ngOnInit(): void {
    // nothing to initialize
  }

  ngOnDestroy(): void {
    this.storageActions.updatePAL();
  }

  addToPAL(user: any): void {
    this.actions.addAbsender(user);
  }

  removeFromPAL(id: number): void {
    this.actions.removeAbsender(id);
  }

  editAbsender(id: number): void {
    this.log.debug(`edit ${id}`);
  }
}
