import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import 'rxjs/add/operator/filter';

import { AbsenderlisteActions } from '../store/actions/absenderliste-actions';
import { StorageService } from './storage.service';
import { Absender } from '../storage/absender';
import { FormBoxState } from '../store/states/formbox-state';

@Injectable()
export class AbsenderlisteService {

  constructor(
    private store: NgRedux<FormBoxState>,
    private actions: AbsenderlisteActions,
    private storage: StorageService
  ) { }

  selectAbsender(id: number): void {
    this.actions.changeAbsender(id);
  }

  loadAbsenderliste(): Promise<Absender[]> {
    return this.storage.getPAL();
  }

  loadAbsender(): Promise<number> {
    return this.storage.getSelected();
  }
}
