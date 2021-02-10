import { animate, style, transition, trigger } from '@angular/animations';

export const expandCollapse = trigger('expandCollapse', [
  transition(':enter', [
    style({ height: 0, opacity: 0, visibility: 'hidden', overflowY: 'hidden' }),
    animate('0.3s ease-out', style({ height: '*', opacity: 1, visibility: 'visible', overflowY: 'hidden' }))
  ]),
  transition(':leave', [
    style({ height: '*', opacity: 1, visibility: 'visible', overflowY: 'hidden' }),
    animate('0.3s ease-out', style({ height: 0, opacity: 0, visibility: 'hidden', overflowY: 'hidden' }))
  ])
]);
