import { Routes } from '@angular/router';
import { AbsenderVerwaltenComponent } from './components/absender-verwalten/absender-verwalten.component';
import { AbsenderAuswahlComponent } from './components/absender-auswahl/absender-auswahl.component';

import { ExpressionEditorComponent } from './components/expression-editor/expression-editor.component';
import { DocumentCommandEditorComponent } from './components/document-command-editor/document-command-editor.component';
import { ExpressionInsertFragComponent } from './components/expression-insert-frag/expression-insert-frag.component';
import { ExpressionOverrideFragComponent } from './components/expression-override-frag/expression-override-frag.component';
import { DocumentTreeviewComponent } from './components/document-treeview/document-treeview.component';
import { LDAPSucheComponent } from './components/ldap-suche/ldap-suche.component';
import { DebugComponent } from './components/debug-component/debug.component';

export const appRoutes: Routes = [
  { path: 'absender-verwalten', component: AbsenderVerwaltenComponent },
  { path: 'absender-auswahl', component: AbsenderAuswahlComponent },
  { path: 'ldap-suche', component: LDAPSucheComponent },
  { path: 'document-treeview', component: DocumentTreeviewComponent },
  { path: 'debug', component: DebugComponent},
  {
    path: 'expression-editor', component: ExpressionEditorComponent,
    children: [
      { path: '', component: DocumentCommandEditorComponent, outlet: 'document-command-editor-outlet' },
      { path: '', component: ExpressionInsertFragComponent, outlet: 'insert-frag-editor-outlet' },
      { path: '', component: ExpressionOverrideFragComponent, outlet: 'override-frag-editor-outlet' }
    ]
  }
];
