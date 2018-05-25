import { Component, Input, OnInit } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';

export abstract class FormularGuiBase<T> {
  @Input() control: T;

  constructor(protected log: Logger) { }

}
