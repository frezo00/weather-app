import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

import { ICountry } from '../../models';
import { CustomSelectableComponent, makeProvider } from '../../utils';

@Component({
  selector: 'zivv-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [makeProvider<SelectComponent>(SelectComponent)]
})
export class SelectComponent extends CustomSelectableComponent<ICountry> {
  @Input() items!: ICountry[];
  @Input() itemTemplate: TemplateRef<HTMLElement> | undefined;
  @Input() labelKey!: keyof ICountry;
  @Output() itemSelect = new EventEmitter<ICountry>();
}
