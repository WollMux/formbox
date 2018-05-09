import { Component, OnInit } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';
import { Router } from '@angular/router';
import { TemplateActions } from '../../store/actions/template-actions';
import { SachleitendeVerfuegungService } from '../../services/sachleitende-verfuegung.service';
import { OfficeService } from '../../services/office.service';

@Component({
  selector: 'app-debug-component',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {

  constructor(
    private log: Logger,
    private router: Router,
    private templateActions: TemplateActions,
    private office: OfficeService,
    private slv: SachleitendeVerfuegungService
  ) { }

  async ngOnInit(): Promise<void> {
    // debug
  }

  performCommands(): void {
    this.templateActions.performCommands();
  }

  onSLV(): void {
    this.slv.newDocument().then(() => {
      return this.slv.copyCurrentDocument(true);
    }).then(() => {
      return this.slv.copyCurrentDocument();
    }).then(() => {
      this.slv.showDocument();
    });
  }

  onHide(): void {
    //    this.office.getSelection().then(sel => {
    //      this.office.hideRange(sel).then(() => sel.untrack());
    //    });
    Word.run(context => {
      const cc = context.document.contentControls.getFirstOrNullObject();

      return context.sync(cc);
    }).then(cc => {
      return this.office.hideContentControl(cc);
    });
  }

  onUnhide(): void {
    //    this.office.getSelection().then(sel => {
    //      this.office.hideRange(sel).then(() => sel.untrack());
    //    });
    Word.run(context => {
      const cc = context.document.contentControls.getFirstOrNullObject();

      return context.sync(cc);
    }).then(cc => {
      return this.office.unhideContentControl(cc);
    });
  }

  onVP(): void {
    this.office.expandRangeToParagraph().then(range => {

      return this.office.insertContentControl('test', 'tag', range).then(() => {
        return this.office.untrack(range);
      });
    });
  }
}
