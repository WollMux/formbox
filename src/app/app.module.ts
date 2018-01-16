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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgLoggerModule.forRoot(environment.loglevel),
    HttpModule,
    BrowserModule,
    NgReduxModule,
    AccordionModule.forRoot()
  ],
  providers: [
    DexieStorage,
    { provide: StorageService, useClass: LocalStorageService },
    TemplateService,
    TemplateActions,
    TemplateEpics,
    { provide: OfficeService, useClass: environment.officeServie }
  ],
  bootstrap: [ AppComponent ]
})
// tslint:disable-next-line:no-unnecessary-class
export class AppModule {
  constructor(
    private ngRedux: NgRedux<FormBoxState>,
    private devTools: DevToolsExtension,
    private templateEpics: TemplateEpics) {
    const middleware = [
      createEpicMiddleware(this.templateEpics.rootEpic())
    ];
    ngRedux.configureStore(rootReducer, INITIAL_STATE, middleware, devTools.enhancer());
  }
}
