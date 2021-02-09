import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'zivv-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() items!: any[];
  @Input() itemTemplate!: TemplateRef<HTMLElement>;
  @Input() rowHeight = 30;
  @Output() itemSelect = new EventEmitter<any>();

  maxHeight = 160;

  calculateHeight(itemsLength: number): string {
    const height = (itemsLength || 0) * this.rowHeight;
    return height > this.maxHeight ? `${this.maxHeight}px` : `${height}px`;
  }
}
