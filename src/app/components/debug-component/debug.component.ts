import { Component, OnInit } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';
import { Router } from '@angular/router';

@Component({
  selector: 'app-debug-component',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {

  constructor(
    private log: Logger,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    // debug
  }
}
