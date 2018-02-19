import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { Level, NgLoggerModule } from '@nsalaun/ng-logger';

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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    NgLoggerModule.forRoot(environment.loglevel),
    HttpModule,
    BrowserModule,
    NgReduxModule,
    AccordionModule.forRoot()
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    DexieStorage,
    { provide: StorageService, useClass: LocalStorageService },
    TemplateService,
    TemplateActions,
    AbsenderlisteActions,
    LDAPActions,
    AbsenderlisteService,
    AbsenderlisteEpics,
    TemplateEpics,
    LDAPEpics,
    RootEpic,
    { provide: LDAPService, useClass: environment.ldapService },
    ExpressionsService,
    { provide: OfficeService, useClass: environment.officeService }
  ],
  bootstrap: [ AppComponent ]
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
