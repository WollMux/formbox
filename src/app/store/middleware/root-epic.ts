import { Injectable } from '@angular/core';
import { combineEpics } from "redux-observable";
import { TemplateEpics } from "./template-epics";
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
    this.templateEpics.insertingFragments,
    this.absenderlisteEpics.loadingAbsenderliste,
    this.absenderlisteEpics.changingAbsender
  )
}
