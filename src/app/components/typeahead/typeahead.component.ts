import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

import { City } from '../../models';
import { CustomSelectableComponent, makeProvider } from '../../utils';

@Component({
  selector: 'zivv-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
  providers: [makeProvider<TypeaheadComponent>(TypeaheadComponent)]
})
export class TypeaheadComponent extends CustomSelectableComponent<City> {
  @Input() search!: string;
  @Input() items!: City[];
  @Input() itemTemplate: TemplateRef<HTMLElement> | undefined;
  @Input() labelKey!: keyof City;
  @Input() isLoading = false;
  @Input() placeholder = 'Search';
  @Output() itemSelect = new EventEmitter<City>();
  @Output() searchChange = new EventEmitter<string>();

  afterValueUpdate(item: City): void {
    this.search = item ? (item[this.labelKey] as string) : '';
  }
}
