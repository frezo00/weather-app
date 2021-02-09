import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

import { CustomSelectableComponent, makeProvider } from '../../utils';

@Component({
  selector: 'zivv-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [makeProvider<SelectComponent>(SelectComponent)]
})
export class SelectComponent extends CustomSelectableComponent<any> {
  @Input() items!: any[];
  @Input() itemTemplate: TemplateRef<HTMLElement> | undefined;
  @Input() labelKey = '';
  @Output() itemSelect = new EventEmitter<any>();

  onItemSelect(selectedItem: any): void {
    super.writeValue(selectedItem);
    super.toggleOpen(false);
    this.itemSelect.emit(selectedItem);
  }
}
