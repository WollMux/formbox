import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable';
import { TemplateEpics } from './template-epics';
import { AbsenderlisteEpics } from './absenderliste-epics';

@Injectable()
export class RootEpic {
  constructor(
    private templateEpics: TemplateEpics,
    private absenderlisteEpics: AbsenderlisteEpics
  ) { }

  epics = () => combineEpics(
    this.templateEpics.loadingTemplate,
    this.templateEpics.gettingTemplateFromUrl,
    this.templateEpics.openingTemplate,
    this.templateEpics.collectingCommands,
    this.templateEpics.collectingCommandsDone,
    this.templateEpics.executingCommand,
    this.templateEpics.insertingFragment,
    this.templateEpics.insertingFragmentDone,
    this.absenderlisteEpics.loadingAbsenderliste,
    this.absenderlisteEpics.changingAbsender
  )
}
