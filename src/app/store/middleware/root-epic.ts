import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable';
import { TemplateEpics } from './template-epics';
import { AbsenderlisteEpics } from './absenderliste-epics';
import { LDAPEpics } from './ldap-epics';
import { StorageEpics } from './storage-epics';

@Injectable()
export class RootEpic {
  constructor(
    private templateEpics: TemplateEpics,
    private absenderlisteEpics: AbsenderlisteEpics,
    private ldapEpics: LDAPEpics,
    private storageEpics: StorageEpics
  ) { }

  epics = () => combineEpics(
    this.templateEpics.loadingTemplate,
    this.templateEpics.gettingTemplateFromUrl,
    this.templateEpics.openingTemplate,
    this.templateEpics.gettingNextCommand,
    this.templateEpics.executingCommand,
    this.templateEpics.executingCommandDone,
    this.templateEpics.insertingFragment,
    this.absenderlisteEpics.loadingAbsenderliste,
    this.absenderlisteEpics.changingAbsender,
    this.absenderlisteEpics.addingAbsenderByID,
    this.absenderlisteEpics.addingAbsenderByIdDone,
    this.absenderlisteEpics.savingPAL,
    this.ldapEpics.searchingLDAP,
    this.storageEpics.updatingStoragePAL,
    this.storageEpics.updatingStorageSelected
  )
}
