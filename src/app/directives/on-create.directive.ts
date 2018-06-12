// Das Event scheint nur zu funktionieren, wenn es mit `on` losgeht.
/* tslint:disable:directive-selector no-output-on-prefix */

import { Directive, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';

@Directive({
  selector: '[onCreate]'
})
export class OnCreateDirective implements OnInit {

  @Output() onCreate: EventEmitter<any> = new EventEmitter<any>();
  constructor() { /* Empty */ }

  ngOnInit(): void {
    this.onCreate.emit('dummy');
  }
}
