import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-dark-switch',
  templateUrl: './dark-switch.component.html',
  styleUrl: './dark-switch.component.scss',
})
export class DarkSwitchComponent {
  @Input() value = false;
  @Output() changed = new EventEmitter<Event>();

  onChanged(event: Event) {
    this.changed.emit(event);
    this.value = !this.value
  }
}
