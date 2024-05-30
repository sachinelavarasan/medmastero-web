import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dark-switch',
  templateUrl: './dark-switch.component.html',
  styleUrl: './dark-switch.component.scss'
})
export class DarkSwitchComponent {
  @Output() changed = new EventEmitter<any>();
}

