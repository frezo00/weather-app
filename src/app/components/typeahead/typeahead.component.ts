import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

import { AbstractValueAccessor, makeProvider } from '../../shared';

@Component({
  selector: 'zivv-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
  providers: [makeProvider<TypeaheadComponent>(TypeaheadComponent)]
})
export class TypeaheadComponent extends AbstractValueAccessor<string> {
  @Input() items!: any[];
  @Input() itemTemplate: TemplateRef<HTMLElement> | undefined;
  @Input() rowHeight = 45;
  @Input() labelKey = '';
  @Input() isLoading = false;
  @Input() placeholder = 'Search';
  @Output() itemSelect = new EventEmitter<any>();

  isOpen = false;

  toggleOpen(value: boolean): void {
    this.isOpen = value;
  }

  onItemSelect(selectedItem: any): void {
    this.writeValue(this.labelKey ? selectedItem[this.labelKey] : selectedItem);
    this.toggleOpen(false);
    this.itemSelect.emit(selectedItem);
  }

  calculateHeight(itemsLength: number): string {
    const maxHeight = (itemsLength || 0) * this.rowHeight;
    return maxHeight > 160 ? '160px' : `${maxHeight}px`;
  }
}
