import { EventEmitter, Input, Output } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';

/**
 * Stellt Basisfunktionalität für alle Formular-Editor-Komponenten bereit.
 */
export abstract class FormularEditorBase<T> {
  @Input() control: T;
  @Output() update = new EventEmitter();
  @Output() close = new EventEmitter();
  newControl: T;

  constructor(
    protected log: Logger
  ) {  }

  emitUpdate(): void {
    this.update.emit(this.newControl);
  }

  emitClose(): void {
    this.close.emit();
  }
}
