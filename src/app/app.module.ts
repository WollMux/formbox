import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgDragDropModule } from 'ng-drag-drop';
import { Level, NgLoggerModule } from '@nsalaun/ng-logger';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

import { FormBoxState, INITIAL_STATE } from './store/states/formbox-state';
import { AppComponent } from './app.component';
import { LocalStorageService } from './services/local-storage.service';
import { DexieStorage } from './storage/dexie-storage';
import { TemplateService } from './services/template.service';
import { OfficeService } from './services/office.service';
import { StorageService } from './services/storage.service';
import { rootReducer } from './store/reducers/root-reducer';
import { TemplateEpics } from './store/middleware/template-epics';
import { createEpicMiddleware } from 'redux-observable';
import { TemplateActions } from './store/actions/template-actions';
import { applyMiddleware, createStore } from 'redux';
import { environment } from '../environments/environment';
import { AbsenderlisteActions } from './store/actions/absenderliste-actions';
import { AbsenderlisteService } from './services/absenderliste.service';
import { RootEpic } from './store/middleware/root-epic';
import { AbsenderlisteEpics } from './store/middleware/absenderliste-epics';
import { ExpressionsService } from './services/expressions.service';
import { LDAPService } from './services/ldap.service';
import { LDAPEpics } from './store/middleware/ldap-epics';
import { LDAPActions } from './store/actions/ldap-actions';
import { appRoutes } from './app.routes';
import { LDAPSucheComponent } from './components/ldap-suche/ldap-suche.component';
import { AbsenderVerwaltenComponent } from './components/absender-verwalten/absender-verwalten.component';
import { AbsenderAuswahlComponent } from './components/absender-auswahl/absender-auswahl.component';
import { StorageEpics } from './store/middleware/storage-epics';
import { StorageActions } from './store/actions/storage-actions';
import { LdapFilterValidatorDirective } from './directives/ldap-filter-validator.directive';
import { LDAPMockService } from './services/mocks/ldap.mock.service';
import { ExpressionEditorComponent } from './components/expression-editor/expression-editor.component';
import { ExpressionEditorCommandsEpics } from './store/middleware/expression-editor-commands-epics';
import { DocumentCommandEditorComponent } from './components/document-command-editor/document-command-editor.component';
import { ExpressionValidatorDirective } from './directives/expression-validator-directive';
import { ExpressionInsertFragComponent } from './components/expression-insert-frag/expression-insert-frag.component';
import { ExpressionOverrideFragComponent } from './components/expression-override-frag/expression-override-frag.component';

@NgModule({
  declarations: [
    AppComponent,
    LDAPSucheComponent,
    AbsenderVerwaltenComponent,
    AbsenderAuswahlComponent,
    LdapFilterValidatorDirective,
    ExpressionEditorComponent,
    DocumentCommandEditorComponent,
    ExpressionValidatorDirective,
    ExpressionInsertFragComponent,
    ExpressionOverrideFragComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    FormsModule,
    NgLoggerModule.forRoot(environment.loglevel),
    HttpModule,
    BrowserModule,
    NgReduxModule,
    AccordionModule.forRoot(),
    NgDragDropModule.forRoot(),
    FormsModule,
    Angular2FontawesomeModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    DexieStorage,
    { provide: StorageService, useClass: LocalStorageService },
    TemplateService,
    TemplateActions,
    AbsenderlisteActions,
    LDAPActions,
    StorageActions,
    AbsenderlisteService,
    AbsenderlisteEpics,
    TemplateEpics,
    LDAPEpics,
    StorageEpics,
    RootEpic,
    { provide: LDAPService, useClass: environment.test ? LDAPMockService : LDAPService },
    ExpressionsService,
    ExpressionEditorCommandsEpics,
    { provide: OfficeService, useClass: environment.officeService }
  ],
  bootstrap: [AppComponent]
})
// tslint:disable-next-line:no-unnecessary-class
export class AppModule {
  constructor(
    private ngRedux: NgRedux<FormBoxState>,
    private devTools: DevToolsExtension,
    private rootEpic: RootEpic) {
    const middleware = [
      createEpicMiddleware(this.rootEpic.epics())
    ];
    if (environment.production || !environment.test) {
      ngRedux.configureStore(rootReducer, INITIAL_STATE, middleware);
    } else {
      ngRedux.configureStore(rootReducer, INITIAL_STATE, middleware, devTools.enhancer());
    }
  }
}
