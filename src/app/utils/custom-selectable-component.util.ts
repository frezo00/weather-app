import { EventEmitter, TemplateRef } from '@angular/core';

import { AbstractValueAccessor } from './abstract-value-acessor.util';

export abstract class CustomSelectableComponent<T> extends AbstractValueAccessor<T> {
  abstract items: T[];
  abstract itemTemplate: TemplateRef<HTMLElement> | undefined;
  abstract labelKey: keyof T | undefined;
  abstract itemSelect = new EventEmitter<T>();

  isOpen = false;
  onToggleClose(): void {}

  onItemSelect(selectedItem: T): void {
    super.writeValue(selectedItem);
    this.toggleOpen(false);
    this.itemSelect.emit(selectedItem);
  }

  toggleOpen(value: boolean): void {
    this.isOpen = value;
    if (!this.isOpen) {
      this.onToggleClose();
    }
  }
}
