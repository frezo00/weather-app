import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'zivv-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() options!: any[] | null;
  @Input() optionTemplate: TemplateRef<HTMLElement> | undefined;
  @Input() set labelKey(_: string) {
    this.hasKey = this.options?.every(option => typeof option === 'object') || false;
    this.selectedOption = this.hasKey ? { [this.labelKey]: '--' } : '--';
  }
  @Output() optionSelect = new EventEmitter<any>();

  selectedOption: any | undefined;
  isOpen = false;
  hasKey = false;

  constructor() {}

  ngOnInit(): void {}

  toggleOpen(value: boolean): void {
    this.isOpen = value;
  }

  onSelect(selected: any): void {
    this.selectedOption = selected;
    this.toggleOpen(false);
    this.optionSelect.emit(this.selectedOption);
  }

  trackByOption = (i: number, _: any): number => i;
}
