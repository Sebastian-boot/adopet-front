import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ErrorMessagesComponent implements OnChanges {
  @Input() errors: string[] = [];
  @Input() title: string = 'Se encontraron los siguientes errores:';
  @Input() showIcon: boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['errors'] && this.errors.length > 0) {
      console.log('Nuevos errores detectados:', this.errors);
    }
  }
}
