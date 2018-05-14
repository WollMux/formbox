import { Component, OnInit } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';
import { Router } from '@angular/router';
import { TemplateActions } from '../../store/actions/template-actions';

@Component({
  selector: 'app-debug-component',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {

  constructor(
    private log: Logger,
    private router: Router,
    private templateActions: TemplateActions
  ) { }

  async ngOnInit(): Promise<void> {
    // debug
  }

  performCommands(): void {
    this.templateActions.performCommands();
  }
}
