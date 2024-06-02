import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-normal',
  templateUrl: './button-normal.component.html',
  styleUrl: './button-normal.component.scss'
})
export class ButtonNormalComponent {
  @Input() type = 'button';
  @Input() label = 'submit';
  @Input() btnClass = '';
  @Input() loading = false;
  @Input() isDisabled = false;
  @Input() buttonType = '';
  @Output() btnClick = new EventEmitter();

  onBtnClick(event:Event){
    this.btnClick.emit(event);
  }
}
