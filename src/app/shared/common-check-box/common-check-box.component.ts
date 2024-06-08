import { Component, EventEmitter, Input, Output } from '@angular/core';

let componentIndex = 0;
@Component({
  selector: 'app-common-check-box',
  templateUrl: './common-check-box.component.html',
  styleUrls: ['./common-check-box.component.scss'],
})
export class CommonCheckBoxComponent {
  @Input() label = '';
  @Input() tickColor = '';
  @Input() isChecked = false;
  @Input() clickNeeded = true;
  @Output() changed = new EventEmitter();
  @Input() isDisabled = false;

  id = `checkbox-${componentIndex++}`;
}
