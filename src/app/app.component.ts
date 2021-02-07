import { Component } from '@angular/core';

@Component({
  selector: 'zivv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  days = [
    { name: 'Monday', value: 10 },
    { name: 'Tuesday', value: 8 },
    { name: 'Wednesday', value: 8 },
    { name: 'Thursday', value: 8 },
    { name: 'Friday', value: 12 },
    { name: 'Saturday', value: 10 },
    { name: 'Sunday', value: 10 }
  ];
}
