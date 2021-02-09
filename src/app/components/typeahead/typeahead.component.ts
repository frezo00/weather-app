import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

import { CustomSelectableComponent, makeProvider } from '../../utils';

@Component({
  selector: 'zivv-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
  providers: [makeProvider<TypeaheadComponent>(TypeaheadComponent)]
})
export class TypeaheadComponent extends CustomSelectableComponent<string> {
  @Input() items!: any[];
  @Input() itemTemplate: TemplateRef<HTMLElement> | undefined;
  @Input() labelKey = '';
  @Input() isLoading = false;
  @Input() placeholder = 'Search';
  @Output() itemSelect = new EventEmitter<any>();

  onItemSelect(selectedItem: any): void {
    super.writeValue(this.labelKey ? selectedItem[this.labelKey] : selectedItem);
    super.toggleOpen(false);
    this.itemSelect.emit(selectedItem);
  }
}
