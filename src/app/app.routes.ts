import { Routes } from '@angular/router';
import { AbsenderVerwaltenComponent } from './components/absender-verwalten/absender-verwalten.component';
import { AbsenderAuswahlComponent } from './components/absender-auswahl/absender-auswahl.component';

import { ExpressionEditorComponent } from './components/expression-editor/expression-editor.component';
import { AppComponent } from './app.component';

export const appRoutes: Routes = [
  { path: 'absender-verwalten', component: AbsenderVerwaltenComponent },
  { path: 'absender-auswahl', component: AbsenderAuswahlComponent }
  { path: 'expression-editor', component: ExpressionEditorComponent }
];
