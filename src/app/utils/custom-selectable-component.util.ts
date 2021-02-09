import { AbstractValueAccessor } from './abstract-value-acessor.util';

export abstract class CustomSelectableComponent<T> extends AbstractValueAccessor<T> {
  isOpen = false;

  abstract onItemSelect(selectedItem: T): void;

  toggleOpen(value: boolean): void {
    this.isOpen = value;
  }
}
