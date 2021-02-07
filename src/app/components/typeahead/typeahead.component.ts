import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'zivv-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent implements OnInit {
  @Input() placeholderText = 'Search';

  constructor() {}

  ngOnInit(): void {}
}
