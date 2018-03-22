import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable';
import { TemplateEpics } from './template-epics';
import { AbsenderlisteEpics } from './absenderliste-epics';
import { LDAPEpics } from './ldap-epics';
import { StorageEpics } from './storage-epics';
import { ExpressionEditorCommandsEpics } from './expression-editor-commands-epics';
import { DocumentTreeViewEpics } from './document-treeview-epics';
import { DialogEpics } from './dialog-epics';
import { FormularEditorEpics } from './formular-editor-epics';

@Injectable()
export class RootEpic {
  constructor(
    private templateEpics: TemplateEpics,
    private absenderlisteEpics: AbsenderlisteEpics,
    private ldapEpics: LDAPEpics,
    private storageEpics: StorageEpics,
    private expressEditorCommandsEpics: ExpressionEditorCommandsEpics,
    private documentTreeViewEpics: DocumentTreeViewEpics,
    private dialogEpics: DialogEpics,
    private formularEpics: FormularEditorEpics
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
    this.expressEditorCommandsEpics.startSelectingCommand,
    this.expressEditorCommandsEpics.selectCommand,
    this.documentTreeViewEpics.getBarList,
    this.dialogEpics.displayDialog,
    this.formularEpics.loadingForm,
    this.formularEpics.startSavingForm,
    this.formularEpics.savingForm,
    this.formularEpics.creatingForm,
    this.formularEpics.creatingControl,
    this.formularEpics.deletingControl,
    this.formularEpics.editingControl,
    this.formularEpics.hidingControl
  )
}
