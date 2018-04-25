import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable';
import { TemplateEpics } from './template-epics';
import { AbsenderlisteEpics } from './absenderliste-epics';
import { LDAPEpics } from './ldap-epics';
import { StorageEpics } from './storage-epics';
import { ExpressionEditorCommandsEpics } from './expression-editor-commands-epics';
import { DocumentTreeViewEpics } from './document-treeview-epics';
import { DialogEpics } from './dialog-epics';

@Injectable()
export class RootEpic {
  constructor(
    private templateEpics: TemplateEpics,
    private absenderlisteEpics: AbsenderlisteEpics,
    private ldapEpics: LDAPEpics,
    private storageEpics: StorageEpics,
    private expressEditorCommandsEpics: ExpressionEditorCommandsEpics,
    private documentTreeViewEpics: DocumentTreeViewEpics,
    private dialogEpics: DialogEpics
  ) { }

  epics = () => combineEpics(
    this.templateEpics.loadingTemplate,
    this.templateEpics.loadingTemplateDone,
    this.templateEpics.gettingTemplateFromUrl,
    this.templateEpics.openingTemplate,
    this.templateEpics.gettingNextCommand,
    this.templateEpics.executingCommand,
    this.templateEpics.executingCommandDone,
    this.templateEpics.insertingFragment,
    this.templateEpics.gettingFragments,
    this.absenderlisteEpics.loadingAbsenderState,
    this.absenderlisteEpics.changingAbsender,
    this.absenderlisteEpics.savingPAL,
    this.absenderlisteEpics.changingAbsender,
    this.ldapEpics.searchingLDAP,
    this.storageEpics.updatingStoragePAL,
    this.storageEpics.updatingStorageSelected,
    this.expressEditorCommandsEpics.initialising,
    this.expressEditorCommandsEpics.creatingDocumentCommand,
    this.expressEditorCommandsEpics.savingDocumentCommand,
    this.expressEditorCommandsEpics.deletingDocumentCommand,
    this.expressEditorCommandsEpics.selectCommand,
    this.documentTreeViewEpics.getTemplateList,
    this.dialogEpics.displayDialog
  )
}
