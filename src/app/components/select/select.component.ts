import { Component, EventEmitter, HostListener, Input, Output, TemplateRef } from '@angular/core';

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

  keyboardSearch = '';

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    // Check user keyboard input if dropdown open to filter the flags by country code
    if (this.isOpen) {
      if (event.key.length === 1 && /[a-zA-Z]/.test(event.key) && this.keyboardSearch.length < 2) {
        this.keyboardSearch += event.key;
      } else if (event.key === 'Backspace' && this.keyboardSearch.length) {
        this.keyboardSearch = this.keyboardSearch.slice(0, -1);
      }
    }
  }

  onToggleClose(): void {
    this.keyboardSearch = '';
  }
}
